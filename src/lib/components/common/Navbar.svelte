<script lang="ts">
	import routes from '../../store/routes';
	import { goto } from '$app/navigation';
	import Fa from 'svelte-fa';
	import { faBars } from '@fortawesome/free-solid-svg-icons';
	import PoiManager from '$lib/poi/poi-manager';

	const poiManager = new PoiManager();
	let toggleMenuButton: HTMLButtonElement, navbarWrapper: HTMLDivElement, navbarScrollHeight: number;

	function deletePois() {
		const confirm = window.confirm('¿Estás seguro de que deseas eliminar todos los Pois?');

		if (confirm) {
			poiManager.deleteAllPois();
			goto('/');
		}
	}

	function toggleMenu() {
		navbarWrapper.classList.add('menu-open');

		if (!navbarScrollHeight) {
			navbarScrollHeight = navbarWrapper.scrollHeight;
		}

		navbarWrapper.style.maxHeight = `${navbarScrollHeight}px`;
		navbarWrapper.classList.toggle('menu-closed');
	}

	function resetMenu() {
		if (window.getComputedStyle(toggleMenuButton).display === 'none') {
			navbarWrapper.classList.remove(...'menu-open menu-closed'.split(' '));
		}
	}
</script>

<svelte:window on:resize={resetMenu} />
<div class="bg-gradient-to-l from-sky-800 to-sky-600 p-3 flex flex-col items-center justify-center">
	<button class="sm:hidden text-xl text-white mb-6 mt-3 hover:animate-pulse" bind:this={toggleMenuButton} on:click={toggleMenu}>
		<Fa icon={faBars} />
	</button>
	<div bind:this={navbarWrapper} class="overflow-hidden">
		<ul class="flex flex-col flex-wrap items-center justify-center gap-8 sm:flex-row">
			{#each $routes.entries() as [route, name]}
				<li class="flex w-full items-center justify-center sm:w-auto font-regular text-xl text-slate-100 hover:text-sky-100">
					<a href={route}>
						<p class="">{name}</p>
					</a>
				</li>
			{/each}
			<li class="flex w-full items-center justify-center sm:w-auto font-regular text-xl text-slate-100 hover:text-red-200">
				<button class="" on:click={deletePois}>Restablecer</button>
			</li>
		</ul>
	</div>
</div>
