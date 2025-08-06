<script lang="ts">
	import { Parallax } from '$lib/utils/parallax';
	import { onMount } from 'svelte';

	onMount(() => {
		const deinit = Parallax.init();
		Parallax.animate();
		return deinit;
	});
</script>

<div style="height: 200vh; background: #111;"></div>

<div class="parallax" style="height: 300px; background: teal;" data-offset="50">
	<h1 style="color: white; text-align: center;">Parallax Me!</h1>
</div>

<div style="height: 200vh; background: #222;"></div>
