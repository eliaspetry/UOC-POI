<script lang="ts">
	import Alert from './Alert.svelte';
	import PoiManager from '../../poi/poi-manager';
	import poiSampleInput from './poiSampleInput';
	import { goto } from '$app/navigation';
	import CodeMirror from 'svelte-codemirror-editor';
	import { dracula } from '@uiw/codemirror-theme-dracula';
	import { json } from '@codemirror/lang-json';

	let poiManager = new PoiManager(),
		poiInput = '',
		isValidInput = false,
		showAlert = false;

	function validateJSON() {
		isValidInput = poiManager.uploadPois(poiInput);
		showAlert = true;
	}

	function submitJSON() {
		if (poiManager.uploadPois(poiInput, true)) {
			goto('/view');
		}
	}

	function generateSampleInput() {
		poiInput = JSON.stringify(poiSampleInput, null, 4);
		validateJSON();
	}
</script>

<form class="flex flex-col content-center items-center" on:submit|preventDefault={submitJSON}>
	{#if showAlert}
		{#if isValidInput}
			<Alert type="success" title="¡Todo listo! ✅" message="Has introducido un JSON correcto: añade los Pois cuando quieras." />
		{:else}
			<Alert type="error" title="¡JSON incorrecto! ⛔" message="Por favor, revisa el formato y/o contenido que has introducido." />
		{/if}
	{/if}
	<button
		class="mb-4 w-11/12 rounded bg-emerald-400 px-4 py-2 font-bold text-white hover:bg-emerald-500 sm:w-64"
		on:click|preventDefault={generateSampleInput}
	>
		✍️ Dame un ejemplo JSON
	</button>
	<CodeMirror
		bind:value={poiInput}
		on:change={validateJSON}
		lang={json()}
		theme={dracula}
		class="mb-4 w-11/12 max-w-5xl rounded-md p-2 sm:w-10/12 bg-[#282a36] overflow-auto h-[600px]"
	/>
	<button type="submit" class="w-11/12 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 sm:w-64">Añadir Pois</button>
</form>
