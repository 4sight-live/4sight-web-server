import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

const NODE_COUNT = 40;
const NODE_SIZE = 0.5;
const NODE_GLOW_INTENSITY = 0.8;
const PULSE_DURATION = 1000;
const PULSE_DEPTH = 8;
const PULSE_FREQUENCY = 0.5; // Hz
const ROTATION_SPEED = 0.001;
const CLUSTER_RADIUS = 50; // radius for node distribution

export const render = (canvas: HTMLCanvasElement) => {
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 60;

	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	const controls = new OrbitControls(camera, renderer.domElement);

	const composer = new EffectComposer(renderer);
	composer.addPass(new RenderPass(scene, camera));
	const bloomPass = new UnrealBloomPass(
		new THREE.Vector2(window.innerWidth, window.innerHeight),
		1.5,
		0.4,
		0.85
	);
	bloomPass.threshold = 0.0;
	bloomPass.strength = 2.2;
	bloomPass.radius = 0.9;
	composer.addPass(bloomPass);

	const light = new THREE.PointLight(0xffffff, 1, 0);
	light.position.set(0, 0, 0);
	scene.add(light);

	const baseMaterial = new THREE.MeshStandardMaterial({
		color: 0x00ffff,
		emissive: 0x88ccff,
		emissiveIntensity: NODE_GLOW_INTENSITY,
		metalness: 0.4,
		roughness: 0.3
	});

	const nodes: THREE.Mesh[] = [];
	type PulseState = { mesh: THREE.Mesh; start: number };
	const activePulses: PulseState[] = [];

	const positions: THREE.Vector3[] = [];

	// Create nodes
	const nodeGeometry = new THREE.SphereGeometry(NODE_SIZE, 16, 16);
	for (let i = 0; i < NODE_COUNT; i++) {
		const position = new THREE.Vector3(
			(Math.random() - 0.5) * CLUSTER_RADIUS,
			(Math.random() - 0.5) * CLUSTER_RADIUS,
			(Math.random() - 0.5) * CLUSTER_RADIUS
		);
		positions.push(position);

		const node = new THREE.Mesh(nodeGeometry, baseMaterial.clone());
		node.position.copy(position);
		scene.add(node);
		nodes.push(node);
	}

	// Generate 1–3 connections per node, ensuring single connected cluster
	const adjacency = new Map<number, Set<number>>();
	for (let i = 0; i < NODE_COUNT; i++) adjacency.set(i, new Set());

	const edges: [number, number][] = [];

	// Step 1: make a spanning tree to ensure connectivity
	for (let i = 1; i < NODE_COUNT; i++) {
		const j = Math.floor(Math.random() * i); // connect to an earlier node
		adjacency.get(i)!.add(j);
		adjacency.get(j)!.add(i);
		edges.push([i, j]);
	}

	// Step 2: add random extra edges (1–3 total per node max)
	for (let i = 0; i < NODE_COUNT; i++) {
		const possible = [...Array(NODE_COUNT).keys()].filter(
			(j) => j !== i && !adjacency.get(i)!.has(j) && adjacency.get(j)!.size < 3
		);

		while (adjacency.get(i)!.size < 3 && possible.length > 0) {
			const index = Math.floor(Math.random() * possible.length);
			const j = possible.splice(index, 1)[0];

			adjacency.get(i)!.add(j);
			adjacency.get(j)!.add(i);
			edges.push([i, j]);
		}
	}

	// Build a single LineSegments mesh from all edges
	const linePositions: number[] = [];
	for (const [i, j] of edges) {
		linePositions.push(...positions[i].toArray(), ...positions[j].toArray());
	}
	// const lineGeometry = new THREE.BufferGeometry();
	// lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

	// const lineMaterial = new THREE.LineBasicMaterial({
	// 	color: 0x00ffff,
	// 	transparent: true,
	// 	opacity: 0.8,
	// });
	// const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);

	const lineGeometry = new LineGeometry();
	lineGeometry.setPositions(linePositions);

	const lineMaterial = new LineMaterial({
		color: 0x00ffff,
		linewidth: 0.5, // World units — tweak as needed
		transparent: true,
		opacity: 0.8,
		dashed: false,
		resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)
	});

	const lineSegments = new Line2(lineGeometry, lineMaterial);
	lineSegments.computeLineDistances();
	lineSegments.scale.set(1, 1, 1);

	const startPulseChain = (startIndex: number) => {
		const visited = new Set<number>();
		const startTime = performance.now();

		const pulseNext = (currentIndex: number) => {
			if (performance.now() - startTime > PULSE_DURATION) return;

			if (visited.has(currentIndex)) return;
			visited.add(currentIndex);

			const currentMesh = nodes[currentIndex];
			activePulses.push({ mesh: currentMesh, start: performance.now() });

			const neighbors = Array.from(adjacency.get(currentIndex)!);
			const unvisited = neighbors.filter((n) => !visited.has(n));
			if (unvisited.length === 0) return;

			const nextIndex = unvisited[Math.floor(Math.random() * unvisited.length)];

			// Schedule the next node pulse after a short delay
			setTimeout(() => pulseNext(nextIndex), 100); // 100ms between each pulse
		};

		pulseNext(startIndex);
	};
	scene.add(lineSegments);

	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	const onClick = (event: MouseEvent) => {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);

		const hits = raycaster.intersectObjects(nodes);
		if (hits.length > 0) {
			const node = hits[0].object as THREE.Mesh;
			const index = nodes.indexOf(node);
			if (index !== -1) {
				startPulseChain(index);
			}
		}
	};

	window.addEventListener('click', onClick);

	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		composer.setSize(window.innerWidth, window.innerHeight);
		lineMaterial.resolution.set(window.innerWidth, window.innerHeight); // <-- Add this
	});

	const animate = () => {
		requestAnimationFrame(animate);

		const now = performance.now();

		// Update pulsing nodes
		for (let i = activePulses.length - 1; i >= 0; i--) {
			const { mesh, start } = activePulses[i];
			const elapsed = now - start;

			if (elapsed >= PULSE_DURATION) {
				(mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = NODE_GLOW_INTENSITY;
				activePulses.splice(i, 1);
				continue;
			}

			const progress = elapsed / PULSE_DURATION; // 0 to 1
			const frequency = PULSE_FREQUENCY * 2 * Math.PI;
			const time = elapsed / 1000; // seconds
			const modulation = Math.sin(time * frequency);
			const falloff = 1 - progress;
			const extraGlow = Math.abs(modulation) * falloff * PULSE_DEPTH * NODE_GLOW_INTENSITY;

			(mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
				NODE_GLOW_INTENSITY + extraGlow;
		}

		scene.rotation.y += ROTATION_SPEED;
		controls.update();
		composer.render();
	};

	animate();

	const pulseInterval = setInterval(() => {
		const randomIndex = Math.floor(Math.random() * NODE_COUNT);
		startPulseChain(randomIndex);
	}, 5000); // 10,000 ms = 10 seconds

	return () => {
		window.removeEventListener('click', onClick);
		renderer.dispose();
		nodes.forEach((n) => n.geometry.dispose());
		canvas.replaceWith(canvas.cloneNode(true));
		clearInterval(pulseInterval);
	};
};
