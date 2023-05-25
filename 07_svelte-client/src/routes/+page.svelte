<script lang="ts">
	import LedController from '$lib/LedController.svelte';
	import LedIndicator from '$lib/LedIndicator.svelte';
	import PswIndicator from '$lib/PswIndicator.svelte';
	import AdcIndicator from '$lib/AdcIndicator.svelte';
	import { mcuLink } from '$lib/mcuLink';
	import { onDestroy, onMount } from 'svelte';
	

	let leds: McuLedData[] = [];
	let psws: McuPswData[] = [];
	let adcs: McuAdcData[] = [];

	let lastUpdate = mcuLink.timeGet();
	onMount(() => {
		mcuLink.start((data: McuData) => {
			console.log(data)
			leds = data.leds;
			psws = data.psws;
			adcs = data.adcs;
			lastUpdate = mcuLink.timeGet();

			console.log(leds);
			
		});
		console.clear();
	});

	onDestroy(() => {
		mcuLink.stop();
	});
</script>

<div class="container h-full mx-auto flex justify-center items-center flex flex-col">
	<div class="grid grid-cols-2 gap-2 my-4">
		{#each [0, 1, 2, 3] as i}
			<LedIndicator data={leds[i]} time={lastUpdate} />
		{/each}
	</div>

	<div class="grid grid-cols-2 gap-2 my-4">
		{#each [0, 1, 2, 3] as i}
			<PswIndicator data={psws[i]} time={lastUpdate} />
		{/each}
	</div>

	<div class="grid grid-cols-2 gap-2 my-4">
		{#each [0, 1, 2, 3] as i}
			<AdcIndicator data={adcs[i]} time={lastUpdate} />
		{/each}
	</div>

	<div class="grid grid-cols-2 gap-2 my-4">
		{#each [0, 1, 2, 3] as i}
			<LedController data={leds[i]} time={lastUpdate} />
		{/each}
	</div>
</div>
