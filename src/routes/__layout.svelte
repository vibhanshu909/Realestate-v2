<script>
	import { session } from '$app/stores';
	import Navbar from '$lib/Navbar.svelte';
	import '../app.css';
</script>

<div class="grid min-h-screen grid-rows-[auto,1fr,auto]">
	<header>
		<Navbar user={$session} />
	</header>
	<main class="min-w-full">
		<slot />
	</main>
	<footer class="p-5">
		<h1 class="text-center">&copy; {new Date().getFullYear()} Codemitter Technology Pvt. Ltd.</h1>
	</footer>
</div>
