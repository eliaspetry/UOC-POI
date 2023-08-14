<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const video: any = document.getElementById('video-header');
		video.muted = true;
		video.loop = true;
		try {
			video.play();
		} catch (e) {
			return; // Silently catch DOM Exception or play error if window not focused for now
		}
	});
</script>

<div class="relative" style="height: 400px;">
	<video id="video-header" class="h-full w-full object-cover object-center" autoplay playsinline>
		<source src="/video/header-video.mp4" type="video/mp4" />
		<track kind="captions" />
	</video>
	<div
		class="absolute flex flex-col items-center justify-center gap-8 bg-slate-700 bg-opacity-60"
		style="height: 100%; width: 100%; top: 0; left: 0;"
	>
		<a href="/">
			<div class="flex flex-col items-center justify-center gap-6 sm:flex-row">
				<img src="/img/point-of-interest.png" alt="poi" class="h-14" />
				<p class="text-center text-6xl font-bold text-white">
					UOC <span class="text-[#73edff]">POI</span>
				</p>
			</div>
		</a>
		<div class="flex w-10/12 flex-col items-center justify-center rounded bg-slate-800 bg-opacity-30 px-4 py-2 text-white sm:w-auto">
			<p class="text-center">
				<span class="text-slate-300">🔹PEC6🔹</span> Proyecto Final - Asignatura Introducción a JS II
			</p>
		</div>
	</div>
</div>
