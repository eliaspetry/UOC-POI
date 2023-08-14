<script lang="ts">
	import { pois } from '$lib/store/pois';
	import { onMount } from 'svelte';
	import { selectedPoi } from '$lib/store/ui';

	let selectedOption = '';

	function handleSelect(event: Event) {
		const target = event.target as HTMLSelectElement,
			selectedOption = target.value;

		const res = $pois.get(selectedOption);
		if (res === undefined) throw Error(`No existe el Poi ${selectedOption}`);
		selectedPoi.set(res);
	}

	onMount(() => {
		selectedOption = '';
		selectedPoi.set(undefined);
	});
</script>

<div class="flex flex-col items-center justify-center pb-8">
	<div class="flex items-center justify-center p-4 gap-6 bg-gradient-to-r from-orange-300 to-orange-400 rounded">
		<label for="select" class="text-white font-bold">🌍 Poi:</label>
		<select id="select" class="rounded p-2" bind:value={selectedOption} on:change={handleSelect}>
			<option value="" disabled selected>Selecciona un Poi</option>
			{#each $pois.entries() as [hash, poi]}
				<option value={hash}>{poi.description}</option>
			{/each}
		</select>
	</div>
</div>
