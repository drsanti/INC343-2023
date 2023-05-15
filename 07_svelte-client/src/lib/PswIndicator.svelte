<script lang="ts">
	import Footer from './Footer.svelte';

	export let data: McuLedData;
	export let time: string;
</script>

{#if data != undefined}
	<div class="card justify-center w-48">
		<div class="border-2 border-gray-800 rounded-md bg-gray-900">
			<header class="card-header pt-2">
				<div class="flex items-center">
					<!-- PSW shape -->
					<div class="{data?.value ? 'on' : 'off'} w-8 h-4 rounded-sm mx-1" />
					<!-- Text -->
					<div class="flex px-2 h-8 items-center">
						<span class="px-0">PSW</span>
						<span class="px-0">{data?.id}</span>
						<span class="px-2 {data?.value ? 'text-on' : 'text-off'}"
							><strong>{data?.value ? 'ON' : 'OFF'}</strong></span
						>
					</div>
				</div>
			</header>
			<Footer info={time} />
		</div>
	</div>
{/if}

<style>
	.on {
		@apply bg-lime-400 mx-3;
	}
	.off {
		@apply bg-lime-950 mx-3;
	}

	.text-on {
		@apply text-yellow-400;
	}
	.text-off {
		@apply text-gray-500;
	}
</style>
