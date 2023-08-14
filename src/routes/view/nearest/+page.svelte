<script lang="ts">
	import PoiList from '$lib/components/forms/PoiList.svelte';
	import PoiManager from '$lib/poi/poi-manager';
	import PoiSelect from '$lib/components/forms/PoiSelect.svelte';
	import { selectedPoi } from '$lib/store/ui';

	const poiManager = new PoiManager();
</script>

<section class="py-8">
	<PoiSelect />
	<PoiList pois={$selectedPoi ? poiManager.getNearestPois($selectedPoi) : []} showDistance />
</section>
