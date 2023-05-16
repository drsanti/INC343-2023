<!-- Lec1 -->
<script lang="ts">
	import { mcuLink } from "$lib/mcuLink";
	import { onDestroy, onMount } from "svelte";

	let leds: McuLedData[] = [];
	let psws: McuPswData[] = [];
	let adcs: McuAdcData[] = [];

	let led0Status = "ON";
	let swClassName = "sw-off";
	let adc1Value = 0;
	let textClass = "";

	onMount(() => {
		mcuLink.start( (data: McuData) => {
			leds = data.led;
			led0Status = leds[0].value ? "ON" : "OFF";

			psws = data.psw;
			swClassName = psws[3].value ? "sw-on" : "sw-off";
		
			adcs = data.adc;
			adc1Value = adcs[1].value;
			textClass = adc1Value < 100 ? "adc1-low" : "adc1-high";
		})
	});

	onDestroy(() => {
		mcuLink.stop();
	});

	const led0tgl = () => {
		mcuLink.ledInv(0);	
	}
</script>

<div>
	<div>LED0: {led0Status}</div>
	<button on:click={led0tgl} class="border">
		Toggle LED0
	</button>

	<div class="{swClassName}"></div>
	<div class="{textClass}">AI1: {adc1Value}</div>
</div>

<style>
	.sw-on {
		@apply w-4 h-4 bg-green-400;
	}
	.sw-off {
		@apply w-4 h-4 bg-green-900;
	}

	.adc1-low {
		@apply text-blue-500;	
	}
	.adc1-high {
		@apply text-red-500;	
	}
</style>













<!-- <script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { mcuLink } from '$lib/mcuLink';
	import LedIndicator from '$lib/LedIndicator.svelte';
	import PswIndicator from '$lib/PswIndicator.svelte';
	import AdcIndicator from '$lib/AdcIndicator.svelte';
	import LedController from '$lib/LedController.svelte';


	let leds: McuLedData[] = [];
	let psws: McuPswData[] = [];
	let adcs: McuAdcData[] = [];

	let lastUpdate = mcuLink.timeGet();

	onMount(() => {
		mcuLink.start((data: McuData) => {
			leds = data.led;
			psws = data.psw;
			adcs = data.adc;
			lastUpdate = mcuLink.timeGet();

			
		});
		console.clear();
	});

	onDestroy(() => {
		mcuLink.stop();
	});
</script>

<div class="container h-full mx-auto justify-center items-center flex flex-col">

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
</div> -->
