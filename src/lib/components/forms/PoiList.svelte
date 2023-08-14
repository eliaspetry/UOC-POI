<script lang="ts">
	import PoiManager from '$lib/poi/poi-manager';
	import type Poi from '$lib/poi/poi';
	import { getPoiHash } from '$lib/poi/hashing';
	import { mappedDistances } from '$lib/store/distances';
	import { selectedPoi } from '$lib/store/ui';
	export let allowDelete = false;
	export let showDistance = false;
	export let pois: Poi[];
	import { pois as globalPois } from '$lib/store/pois';

	const poiManager = new PoiManager();
</script>

{#if $globalPois.size}
	{#if showDistance && !$selectedPoi}
		<p class="text-center">Selecciona un Poi primero para ver otros cercanos.</p>
	{:else}
		<div class="relative overflow-auto">
			<table class="mx-auto border-radius-md border border-gray-300 table-auto w-full max-w-5xl text-center">
				<thead>
					<tr class="bg-slate-400 text-white">
						<th class="w-auto px-4 py-2">Descripción</th>
						<th class="w-auto px-4 py-2">Longitud</th>
						<th class="w-auto px-4 py-2">Latitud</th>
						<th class="w-auto px-4 py-2">Reviews</th>
						<th class="w-auto px-4 py-2">Media</th>
						{#if showDistance}
							<th class="w-auto px-4 py-2">Distancia</th>
						{/if}
						{#if allowDelete}
							<th class="w-auto bg-red-400 px-4 py-2">Eliminar</th>
						{/if}
					</tr>
				</thead>
				<tbody>
					{#each [...pois.values()] as poi}
						<tr class="bg-slate-100 odd:bg-slate-200">
							<td class="px-4 py-2 text-slate-600"><strong>{poi.description}</strong></td>
							<td class="px-4 py-2">{poi.longitude}</td>
							<td class="px-4 py-2">{poi.latitude}</td>
							<td class="px-4 py-2">{poi.reviews.length}</td>
							<td class="px-4 py-2">{poi.calculateAvgReviewScore().toFixed(2)}</td>
							{#if showDistance}
								<td class="px-4 py-2">{($selectedPoi && $mappedDistances.get(getPoiHash(poi))?.get(getPoiHash($selectedPoi))?.toFixed(2)) || 0} km</td
								>
							{/if}
							{#if allowDelete}
								<td class="px-4 py-2">
									<button data-hash={poi.description} class="rounded bg-slate-400 p-2 hover:bg-slate-500" on:click={() => poiManager.deletePoi(poi)}
										>🗑️</button
									>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
{:else}
	<p class="text-center">No se han encontrado Pois. Prueba a agregar unos cuantos desde "Añadir Pois".</p>
{/if}
