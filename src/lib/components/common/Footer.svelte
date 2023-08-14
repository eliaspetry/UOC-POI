<script lang="ts">
	import svelteIcon from 'devicon/icons/svelte/svelte-original.svg';
	import typeScriptIcon from 'devicon/icons/typescript/typescript-original.svg';
	import jestIcon from 'devicon/icons/jest/jest-plain.svg';
	import tailwindIcon from 'devicon/icons/tailwindcss/tailwindcss-plain.svg';
	import Fa from 'svelte-fa';
	import { faCode } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="flex flex-col items-center justify-center p-8 gap-6 bg-gradient-to-b from-sky-600 to-sky-700">
	<div class="flex items-center justify-center gap-2">
		<p class="text-slate-300 text-md">
			&copy; {new Date().getFullYear()} - <span class="text-white">Elias Petry</span> |
		</p>
		<a href="https://www.uoc.edu/es/estudios/masters/master-universitario-desarrollo-sitios-aplicaciones-web"
			><Fa icon={faCode} class="text-[30px] text-white" /></a
		>
		<p class="text-slate-300 text-md">@</p>
		<a href="https://www.uoc.edu/"><img src="/img/uoc-logo.png" alt="logo uoc" title="UOC" class="h-[32px]" /></a>
	</div>
	<div
		class="flex flex-col gap-4 items-center justify-center w-auto py-4 px-12 rounded-lg bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.25)] max-w-max shadow-lg shadow-white/10"
	>
		<p class="text-white">Desarrollado con:</p>
		<div class="flex gap-4">
			<a href="https://svelte.dev/"><img src={svelteIcon} alt="svelte" title="Svelte" class="h-[30px]" /></a>
			<a href="https://www.typescriptlang.org/"><img src={typeScriptIcon} alt="typescript" title="TypeScript" class="h-[30px]" /></a>
			<a href="https://tailwindcss.com/"><img src={tailwindIcon} alt="tailwind" title="Tailwind" class="h-[30px]" /></a>
			<a href="https://jestjs.io/"><img src={jestIcon} alt="jest" title="Jest" class="h-[30px]" /></a>
		</div>
		<p class="text-slate-300">
			Artwork:
			<a class="text-orange-300 hover:text-orange-200" href="https://www.pexels.com/es-es/">Pexels</a>
			y <a class="text-orange-300 hover:text-orange-200" href="https://www.flaticon.es/">Flaticon</a>
		</p>
	</div>
</div>
