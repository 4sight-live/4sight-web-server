<script>
	import { Struct } from 'drizzle-struct/front-end';
	import { browser } from '$app/environment';
	import Navbar from '$lib/components/general/Navbar.svelte';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import JoinNewsletter from '$lib/components/modals/JoinNewsletter.svelte';

	setTimeout(() => {
		if (browser) Struct.buildAll();
	});
	const { children } = $props();
</script>

<main>
	<Navbar title={PUBLIC_APP_NAME} />
	{@render children()}
</main>

<JoinNewsletter />