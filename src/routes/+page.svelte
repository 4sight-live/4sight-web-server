<script lang="ts">
	import Card from '$lib/components/bootstrap/Card.svelte';
	import { PUBLIC_APP_NAME } from '$env/static/public';
</script>

<svelte:head>
	<title>{PUBLIC_APP_NAME}</title>
</svelte:head>

<div class="background-container">
	<div class="background-image"></div>
	<h1
		class="position-absolute start-50 translate-middle text-center text-white t-shadow"
		style="
			top: 25%;
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
<div class="container layer-1">
	<div class="row mb-3">
		<h3>Our Mission</h3>
	</div>
	<div class="row mb-3">
		<div class="card layer-2">
			<div class="card-body">
				<p>
					To revolutionize the way people experience video content by leveraging
					cutting-edge AI technology to deliver personalized, engaging, and adaptive
					streaming experiences.
				</p>
			</div>
		</div>
	</div>
	<div class="row mb-3">
		<h3>Values</h3>
	</div>
	<div class="row row-1 mb-3">
		<div class="col-md-4">
			<div class="card layer-2">
				<div class="card-body">
					<h5 class="card-title">Innovation</h5>
					<p>
						We are constantly pushing the boundaries of what is possible.
					</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card layer-2">
				<div class="card-body">
					<h5 class="card-title">Personalization</h5>
					<p>
						We believe in tailored experiences that cater to your individual preferences.
					</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card layer-2">
				<div class="card-body">
					<h5 class="card-title">User Experience</h5>
					<p>
						Our number 1 priority is to create a seamless and enjoyable user experience by anticipating your needs.
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="row mb-3">
		<h3>What is coming</h3>
	</div>
	<div class="row row-2 mb-3">
		<div class="col-md-4">
			<div class="card layer-2">
				<div class="card-body">
					<h5 class="card-title">
						WebRTC Streaming
					</h5>
					<p>
						Real-time, low-latency, easy to integrate streaming technology.
					</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card layer-2">
				<div class="card-body">
					<h5 class="card-title">
						AI Player Switching
					</h5>
					<p>
						Never miss the action using our patented AI scene switching technology
					</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card layer-2">
				<div class="card-body">
					<h5 class="card-title">
						Interactive Experience
					</h5>
					<p>
						Engage with your favorite streamers like never before. Pick your favorite player/team and never miss a good moment.
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="row mb-3">
		<h3>Get Involved</h3>
	</div>
	<div class="row mb-3 row-3">
		<div class="col-md-4">
			<div class="card layer-2">
				<div class="card-body">
					<h5 class="card-title">Join the Community</h5>
					<p>
						Join our community on Discord to connect with other users, share your feedback, and get the latest updates.
					</p>
					<a href="https://discord.gg/gjCggqkyqJ" class="btn btn-primary" target="_blank">
						Join 4Sight Discord
					</a>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card layer-2">
				<div class="card-body">
					<div class="card-title">
						<h5>
							Join our Newsletter
						</h5>
						<p>
							Stay updated with the latest news, features, and updates from 4Sight Streaming.
						</p>
						<button class="btn btn-primary" onclick={() => newsletter.show()}>
							Join our Newsletter
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card layer-2">
				<div class="card-body">
					<h5 class="card-title">
						Get involved
					</h5>
					<p>
						Are you a devloper? We would love to have you on board.
					</p>
					<a href="/get-involved" class="btn btn-primary">
						Join our Team
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
