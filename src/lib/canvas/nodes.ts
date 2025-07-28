import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const NODE_COUNT = 25;
const NODE_SIZE = 0.5;
const NODE_GLOW_INTENSITY = 1.5;
const PULSE_DURATION = 1000;
const ROTATION_SPEED = 0.001;

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
	const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
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
		roughness: 0.3,
	});

	const radius = 30;
	const nodes: THREE.Mesh[] = [];
	const positions: THREE.Vector3[] = [];

	// Create nodes
	const nodeGeometry = new THREE.SphereGeometry(NODE_SIZE, 16, 16);
	for (let i = 0; i < NODE_COUNT; i++) {
		const position = new THREE.Vector3(
			(Math.random() - 0.5) * radius,
			(Math.random() - 0.5) * radius,
			(Math.random() - 0.5) * radius
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
		while (adjacency.get(i)!.size < 3) {
			const j = Math.floor(Math.random() * NODE_COUNT);
			if (i !== j && !adjacency.get(i)!.has(j) && adjacency.get(j)!.size < 3) {
				adjacency.get(i)!.add(j);
				adjacency.get(j)!.add(i);
				edges.push([i, j]);
			}
		}
	}

	// Build a single LineSegments mesh from all edges
	const linePositions: number[] = [];
	for (const [i, j] of edges) {
		linePositions.push(...positions[i].toArray(), ...positions[j].toArray());
	}
	const lineGeometry = new THREE.BufferGeometry();
	lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

	const lineMaterial = new THREE.LineBasicMaterial({
		color: 0x00ffff,
		transparent: true,
		opacity: 0.8,
	});
	const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
	scene.add(lineSegments);

	const animatePulse = (mesh: THREE.Mesh) => {
		const start = performance.now();
		const tick = (now: number) => {
			const t = (now - start) / PULSE_DURATION;
			if (t > 1) {
				(mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = NODE_GLOW_INTENSITY;
				return;
			}
			const intensity = NODE_GLOW_INTENSITY + Math.sin(t * Math.PI) * 1.5;
			(mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
			requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	};

	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	const onClick = (event: MouseEvent) => {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);

		const hits = raycaster.intersectObjects(nodes);
		if (hits.length > 0) {
			const node = hits[0].object as THREE.Mesh;
			animatePulse(node);
		}
	};

	window.addEventListener('click', onClick);

	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		composer.setSize(window.innerWidth, window.innerHeight);
	});

	const animate = () => {
		requestAnimationFrame(animate);
		scene.rotation.y += ROTATION_SPEED;
		controls.update();
		composer.render();
	};
	animate();

	return () => {
		window.removeEventListener('click', onClick);
		renderer.dispose();
		nodes.forEach(n => n.geometry.dispose());
		canvas.replaceWith(canvas.cloneNode(true));
	};
};
