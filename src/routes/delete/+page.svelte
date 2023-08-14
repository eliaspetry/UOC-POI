<script lang="ts">
	import PoiList from '$lib/components/forms/PoiList.svelte';
	import { pois } from '$lib/store/pois';
</script>

<section class="py-8">
	<PoiList allowDelete pois={[...$pois.values()]} />
</section>
