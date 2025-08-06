<script lang="ts">
	import { onMount } from 'svelte';
	import { render } from '../../canvas/nodes.ts';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		return render(canvas);
	});
</script>

<canvas bind:this={canvas} width="10000" height="10000"></canvas>
