<script lang="ts">
	import '../app.postcss';
	import '../style.css';
	import Header from '$lib/components/common/Header.svelte';
	import Navbar from '$lib/components/common/Navbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
</script>

<div class="flex flex-col h-screen">
	<header>
		<Header />
		<Navbar />
	</header>
	<main class="flex-grow bg-gradient-to-t from-sky-100 to-sky-300">
		<slot />
	</main>
	<footer>
		<Footer />
	</footer>
</div>
