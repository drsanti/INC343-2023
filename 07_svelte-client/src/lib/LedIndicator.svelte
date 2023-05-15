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
					<!-- LED shape -->
					<div class="{data?.value ? 'on' : 'off'} w-8 h-8 rounded-3xl mx-1" />
					<!-- Text -->
					<div class="flex px-2 h-8 items-center">
						<span class="px-0">LED</span>
						<span class="px-0">{data?.id}</span>
						<span class="px-2 {data?.value ? 'text-on' : 'text-off'}">
							<strong>{data?.value ? 'ON' : 'OFF'}</strong>
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

	.text-on {
		@apply text-green-400;
	}
	.text-off {
		@apply text-gray-500;
	}
</style>
