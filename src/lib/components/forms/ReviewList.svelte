<script lang="ts">
	import { selectedPoi } from '$lib/store/ui';
	import Fa from 'svelte-fa';
	import { faStar } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="flex flex-col items-center w-full">
	{#if $selectedPoi}
		{#if $selectedPoi.reviews.length}
			<div class="flex flex-col items-stretch justify-center w-full max-w-5xl gap-8">
				{#each [...($selectedPoi && $selectedPoi.reviews.reverse())] as review}
					<div class="flex flex-col items-center justify-center gap-8 bg-gradient-to-t from-white to-slate-200 rounded-lg p-8 shadow-lg">
						<div>
							<p class="text-sm text-slate-600">
								Review añadida el <strong>{review.creationDate?.toLocaleString('es-ES')}</strong>
							</p>
						</div>
						<div class="flex gap-2">
							{#each [...Array(4).keys()] as i}
								{#if i <= review.rating}
									<Fa icon={faStar} class="text-yellow-500 text-xl" />
								{:else}
									<Fa icon={faStar} class="text-gray-400 text-xl" />
								{/if}
							{/each}
						</div>
						<div>
							<p class="text-2xl font-bold text-slate-600">{review.comment}</p>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-center">No se han encontrado Reviews. Prueba a agregar unas cuantas desde "Crear Review".</p>
		{/if}
	{:else}
		<p class="text-center">Elige un Poi para ver sus Reviews.</p>
	{/if}
</div>
