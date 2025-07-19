<script lang="ts">
	import { createPage } from '$lib/canvas/front-page';
	import { Canvas } from 'canvas/canvas';
	import { Drawable } from 'canvas/drawable';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let c: Canvas | undefined = $state(undefined);

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('Failed to get canvas context');

		c = new Canvas(ctx);

		return createPage(c);
	});
</script>

<canvas bind:this={canvas} style="width: 100%; aspect-ratio: 2/1;" width="1000" height="500"
></canvas>
