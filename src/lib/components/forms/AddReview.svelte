<script lang="ts">
	import Fa from 'svelte-fa';
	import { faSmile, faGrinStars, faMeh, faFrown, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import { selectedPoi } from '$lib/store/ui';
	import Review from '$lib/poi/review';

	let ratingContainer: HTMLDivElement,
		confirmAlert: HTMLDivElement,
		buttonsDisabled = false,
		selectedRating = 0,
		ratingText = 'Selecciona una calificación';

	const iconMapping: { [key: number]: IconDefinition } = {
			0: faFrown,
			1: faMeh,
			2: faSmile,
			3: faGrinStars
		},
		highlightClasses = '!text-yellow-500'.split(' ');

	function highlightIcons(i: number) {
		const iconButtons: NodeListOf<HTMLButtonElement> = ratingContainer.querySelectorAll('button');

		iconButtons.forEach((iconButton: HTMLButtonElement, index: number) => {
			if (index <= i) {
				iconButton.classList.add(...highlightClasses);
			} else {
				iconButton.classList.remove(...highlightClasses);
			}

			iconButton.style.cursor = buttonsDisabled ? 'not-allowed' : 'pointer';
		});

		ratingText = new Review(i).comment;
	}

	function saveReview(value: number) {
		if ($selectedPoi === undefined || buttonsDisabled) return;

		buttonsDisabled = true;

		selectedRating = value;
		$selectedPoi.addReview(new Review(selectedRating));

		ratingText = new Review(selectedRating).comment;

		confirmAlert.classList.remove('hide-confirm-alert');
		confirmAlert.classList.add('show-confirm-alert');

		setTimeout(() => {
			confirmAlert.classList.remove('show-confirm-alert');
			confirmAlert.classList.add('hide-confirm-alert');

			buttonsDisabled = false;
		}, 1500);
	}
</script>

<div class="flex flex-col items-center justify-center gap-8">
	{#if $selectedPoi !== undefined}
		<div
			class="flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-sky-600 to-sky-800 p-8 rounded"
			on:load={() => highlightIcons(selectedRating)}
		>
			<div class="flex items-center justify-center gap-4" bind:this={ratingContainer}>
				{#each [...Array(4).keys()] as i}
					<div class="flex flex-col items-center justify-center">
						<button
							on:click={() => saveReview(i)}
							on:mouseover={() => highlightIcons(i)}
							on:mouseout={() => highlightIcons(selectedRating)}
							on:focus={() => highlightIcons(i)}
							on:blur={() => highlightIcons(selectedRating)}
							disabled={buttonsDisabled}
							class="text-3xl hover:scale-150 transition duration-300 text-slate-500 p-4"
						>
							<Fa icon={iconMapping[i]} />
						</button>
						<p class="text-white text-xl">{i}</p>
					</div>
				{/each}
			</div>
			<p class="text-white text-xl">{ratingText}</p>
		</div>

		<div
			bind:this={confirmAlert}
			class="flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-white to-sky-100 p-8 rounded-lg shadow-md opacity-0"
		>
			<Fa icon={faCheckCircle} class="text-green-500 text-6xl animate-bounce" />
			<p class="font-bold">¡Review añadida!</p>
		</div>
	{:else}
		<p>Selecciona un Poi para añadir una Review.</p>
	{/if}
	<style>
		.show-confirm-alert {
			opacity: 1;
			animation: show-confirm-alert 1s ease-out;
		}

		.hide-confirm-alert {
			animation: hide-confirm-alert 1s ease-in;
		}

		@keyframes show-confirm-alert {
			0% {
				opacity: 0;
				transform: translateY(100px);
			}
			100% {
				opacity: 1;
				transform: translateY(0px);
			}
		}

		@keyframes hide-confirm-alert {
			0% {
				opacity: 1;
				transform: translateY(0);
			}

			100% {
				opacity: 0;
				transform: translateY(100px);
			}
		}
	</style>
</div>
