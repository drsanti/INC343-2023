<!-- Lec2 - svelte features -->
<script lang="ts">
	import { mcuLink } from "$lib/mcuLink";
	import { onDestroy, onMount } from "svelte";
	let leds: McuLedData[] = [];
	let psws: McuPswData[] = [];
	let adcs: McuAdcData[] = [];
	onMount(() => {
		mcuLink.start( (data: McuData) => {
			leds = data.led;	// 4 LEDs 0..3
			psws = data.psw;	// 4 PSWs 0..3
			adcs = data.adc;	// 4 ADCs 0..3
		});
	});
	onDestroy(() => {
		mcuLink.stop();
	});
</script>

<!-- 
	Svelte(Kit) Basics:
	https://svelte.dev/tutorial/basics
-->


<!-- EX01: {#if} ----------------->
<div>EX01: Show "Pressed" when the PSW0 is pressed</div>
{#if psws.length > 0 && psws[0].value === true}
	Pressed	
{/if}

<!-- EX02: {#if} {:else} --------->
<div>EX02: Display the PSW1 state ("Pressed", "Released")</div>
{#if psws.length > 0 && psws[1].value === true}
	<span class="bg-green-800">Pressed</span>
{:else}
	<b class="bg-red-800">Released</b>	
{/if}


<!-- EX03: {#each} --------------->
<!-- PSW_id: ON/OFF -->
<p>Show information of all switches</p>
{#each psws as sw}
	<p>
		<span>PSW_{sw.id}: </span>
		{#if sw.value}
			<span class="text-green-400">
				{sw.value ? "ON" : "OFF"}</span>
		{:else}
			<span class="text-red-400">
				{sw.value ? "ON" : "OFF"}</span>
		{/if}
	</p>	
{/each}
	

<style>
	
</style>

