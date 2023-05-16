<!-- Lec0-template -->
<script lang="ts">
	import { mcuLink } from "$lib/mcuLink";
	import { onDestroy, onMount } from "svelte";
	let leds: McuLedData[] = [];
	let psws: McuPswData[] = [];
	let adcs: McuAdcData[] = [];
	onMount(() => {
		mcuLink.start( (data: McuData) => {
			leds = data.led;
			psws = data.psw;
			adcs = data.adc;
		});
	});
	onDestroy(() => {
		mcuLink.stop();
	});
</script>


<div>Template</div>
	

<style>
	
</style>
