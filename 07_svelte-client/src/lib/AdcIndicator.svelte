<script lang="ts">
	import Footer from './Footer.svelte';

	export let data: McuAdcData;
	export let time: string;

	const barColors = ['bar-low', 'bar-mid', 'bar-high'];
	const textColors = ['text-low', 'text-mid', 'text-high'];

	$: getHeight = () => `${Math.floor((getPercent() * 10) / 100)}`;
	$: getTextColor = () => textColors[Math.floor(data.value / (1023 / 3))]; // 0 1 2
	$: getBarColor = () => barColors[Math.floor(data.value / (1023 / 3))]; // 0 1 2
	$: getPercent = () => (data.value * 100) / 1023;
</script>

{#if data != undefined}
	<div class="card justify-center w-48">
		<div class="border-2 border-gray-800 rounded-md bg-gray-900">
			<header class="card-header pt-2">
				<div class="flex items-center">
					<!-- Bar shape -->
					<div class="flex w-2 h-10 bg-black justify-center items-end">
						<div class="flex w-2 bar-{getHeight()} {getBarColor()}" />
					</div>

					<!-- Text -->
					<div class="flex px-2 h-8 items-center">
						<span class="px-0">ADC</span>
						<span class="px-0">{data?.id}</span>
						<span class="px-2 {getTextColor()}">
							<strong>{getPercent().toFixed(2)}</strong>
						</span>
					</div>
				</div>
			</header>
			<Footer info={time} />
		</div>
	</div>
{/if}

<style>
	.on {
		@apply bg-red-600 mx-3;
	}
	.off {
		@apply bg-red-950 mx-3;
	}

	.bar-high {
		@apply bg-orange-400;
	}
	.bar-mid {
		@apply bg-lime-500;
	}
	.bar-low {
		@apply bg-blue-500;
	}

	.text-high {
		@apply text-orange-400;
	}
	.text-mid {
		@apply text-lime-500;
	}
	.text-low {
		@apply text-blue-500;
	}

	.bar-0 {
		@apply h-0;
	}
	.bar-1 {
		@apply h-1;
	}
	.bar-2 {
		@apply h-2;
	}
	.bar-3 {
		@apply h-3;
	}
	.bar-4 {
		@apply h-4;
	}
	.bar-5 {
		@apply h-5;
	}
	.bar-6 {
		@apply h-6;
	}
	.bar-7 {
		@apply h-7;
	}
	.bar-8 {
		@apply h-8;
	}
	.bar-9 {
		@apply h-9;
	}
	.bar-10 {
		@apply h-10;
	}
	.bar-11 {
		@apply h-11;
	}
</style>
