<script>
	import { Struct } from 'drizzle-struct/front-end';
	import { browser } from '$app/environment';
	import '$lib/index';
	import Footer from '$lib/components/general/Footer.svelte';

	setTimeout(() => {
		if (browser) Struct.buildAll();
	});
	const { children } = $props();
</script>

<main>
	{@render children()}
</main>

<Footer />