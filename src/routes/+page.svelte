<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Nodes from '$lib/components/decorative/Nodes.svelte';
	import JoinNewsletter from '$lib/components/modals/JoinNewsletter.svelte';
	import { Parallax } from '$lib/utils/parallax';
	import { onMount } from 'svelte';

	let newsletter: JoinNewsletter;

	let gridContainer: HTMLDivElement;

	const renderRows = () => {
		const getMax = (row: Element) => {
			const cards = row.querySelectorAll('.card');
			let maxHeight = 0;
			cards.forEach((card) => {
				const height = card.clientHeight;
				if (height > maxHeight) {
					maxHeight = height;
				}
			});
			return maxHeight;
		};

		const renderMax = (row: Element) => {
			const mx = getMax(row);
			const cards = row.querySelectorAll<HTMLElement>('.card');
			cards.forEach((card) => {
				card.style.height = `${mx}px`;
			});
		};

		const row1 = document.querySelector('.row-1');
		const row2 = document.querySelector('.row-2');
		const row3 = document.querySelector('.row-3');

		if (row1) renderMax(row1);
		if (row2) renderMax(row2);
		if (row3) renderMax(row3);
	};

	onMount(() => {
		renderRows();
		window.addEventListener('resize', renderRows);
		return () => {
			window.removeEventListener('resize', renderRows);
		}
	});
</script>

<svelte:head>
	<title>{PUBLIC_APP_NAME}</title>
</svelte:head>

<div class="background-container">
	<div class="nodes">
		<Nodes />
	</div>
	<div class="tint"></div>
	<h1
		class="position-absolute start-50 translate-middle text-center text-white t-shadow"
		style="
			top: 10%;
			font-size: 3rem;
			font-weight: bold !important;
		"
	>
		4Sight Streaming
	</h1>
	<h3
		class="position-absolute start-50 translate-middle text-center text-white t-shadow"
		style="
			top: 40%;
			font-size: 2rem;
			font-weight: bold !important;
		"
	>
		AI driven video streaming platform
	</h3>
	<h3
		class="position-absolute translate-middle text-center text-white t-shadow"
		style="
			left: 30%;
			top: 60%;
			font-size: 1.5rem;
			font-weight: bold !important;
        "
	>
		Personalized
	</h3>
	<h3
		class="position-absolute translate-middle text-center text-white t-shadow"
		style="
			left: 60%;
			top: 70%;
			font-size: 1.5rem;
			font-weight: bold !important;
		"
	>
		Innovative
	</h3>
	<h3
		class="position-absolute translate-middle text-center text-white t-shadow"
		style="
			left: 30%;
			top: 80%;
			font-size: 1.5rem;
			font-weight: bold !important;
        "
	>
		Engaging
	</h3>
	<h3
		class="position-absolute translate-middle text-center text-white t-shadow"
		style="
			left: 60%;
			top: 90%;
			font-size: 1.5rem;
			font-weight: bold !important;
		"
	>
		Adaptive
	</h3>
</div>
<div class="container layer-1 pt-3" bind:this={gridContainer}>
	<div class="row mb-3">
		<h3>Our Mission</h3>
	</div>
	<div class="row mb-3">
		<div class="card">
			<div class="card-body">
				<p>
					To revolutionize the way people experience video content by leveraging cutting-edge AI
					technology to deliver personalized, engaging, and adaptive streaming experiences.
				</p>
			</div>
		</div>
	</div>
	<div class="row row-1 mb-3 parallax-row">
		<div class="col-12 mb-3">
			<h3>What do we stand for?</h3>
		</div>
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Innovation</h5>
					<p>We are constantly pushing the boundaries of what is possible.</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Personalization</h5>
					<p>We believe in tailored experiences that cater to your individual preferences.</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">User Experience</h5>
					<p>
						Our number 1 priority is to create a seamless and enjoyable user experience by
						anticipating your needs.
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="row row-2 mb-3 parallax-row">
		<div class="col-12 mb-3">
			<h3>What's coming?</h3>
		</div>
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">WebRTC Streaming</h5>
					<p>Real-time, low-latency, easy to integrate streaming technology.</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">AI Player Switching</h5>
					<p>Never miss the action using our patented AI scene switching technology</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Interactive Experience</h5>
					<p>
						Engage with your favorite streamers like never before. Pick your favorite player/team
						and never miss a good moment.
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="row mb-3 row-3 parallax-row">
		<div class="col-12 mb-3">
			<h3>Get Involved</h3>
		</div>
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Join the Community</h5>
					<p>
						Join our community on Discord to connect with other users, share your feedback, and get
						the latest updates.
					</p>
					<a href="https://discord.gg/gjCggqkyqJ" class="btn btn-primary" target="_blank">
						Join 4Sight Discord
					</a>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<div class="card-title">
						<h5>Join our Newsletter</h5>
						<p>Stay updated with the latest news, features, and updates from 4Sight Streaming.</p>
						<button class="btn btn-primary" onclick={() => newsletter.show()}> Join our Newsletter </button>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Get involved</h5>
					<p>Are you a devloper? We would love to have you on board.</p>
					<a href="/get-involved" class="btn btn-primary"> Join our Team </a>
				</div>
			</div>
		</div>
	</div>
</div>
<style>
	.background-container {
		position: relative;
		width: 100%;
		height: 100vh;
	}

	.background-container h1,
	.background-container h3 {
		/* Don't allow text selection */
		user-select: none;
		position: absolute;
		color: white;
		text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
		z-index: 2;
	}


	.nodes {
		overflow-x: hidden;
	}	

	.tint {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 1;
	}

	.t-shadow {
		text-shadow: 2px 2px 15px rgba(255, 255, 255, 0.5);
	}

	.row-1 {
		background-image: url('/assets/hard-drives.jpg');
		background-size: cover;
		background-position: center;
	}

	.row-2 {
		background-image: url('/assets/programming.jpg');
		background-size: cover;
		background-position: center;
	}

	.row-3 {
		background-image: url('/assets/robots.jpg');
		background-size: cover;
		background-position: top;
	}
		

	.parallax-row {
		position: relative;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.6);
		background-blend-mode: overlay;
		min-height: 80vh;
	}

	.row-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		z-index: 0;
	}

	.parallax-row .card,
	.parallax-row .card-body {
		position: relative;
		z-index: 1;
	}

	.card {
		background-color: rgba(0,0,0,0);
		border: none;
	}
</style>


<JoinNewsletter bind:this={newsletter} />