<script lang="ts">
	import Footer from './Footer.svelte';
	import { mcuLink } from './mcuLink';
	export let data: McuLedData;
	export let time: string;

	let btnClass = 'btn-on';
	let id = 0;
	let btnText = `ON LED${id}`;

	const toggle = async (e: any) => {
		id = e.target.id;
		mcuLink.requestData((mcuData: McuData) => {
			data = mcuData.led[id];

			if (data.value) {
				mcuLink.ledOff(id);
			} else {
				mcuLink.ledOn(id);
			}

			btnClass = data.value ? 'btn-on' : 'btn-off';
			e.target.innerHTML = `${data.value ? 'ON' : 'OFF'} LED${id}`;

			mcuLink.beep(50, 2000, 80);
		});

		// await new Promise((resolve) => setTimeout(resolve, 1000));
	};
</script>

{#if data != undefined}
	<div class="card justify-center w-48">
		<div class="border-2 border-yellow-950 rounded-md bg-gray-900">
			<header class="card-header pt-4 pb-2">
				<div class="flex items-center">
					<!-- LED shape -->
					<div class="{data?.value ? 'on' : 'off'} w-8 h-8 rounded-3xl mx-1" />
					<!-- Button -->
					<div class="flex px-2 h-8 items-center">
						<button
							id={data.id.toString()}
							class="px-3 py-2 btn {btnClass} rounded-lg text-xs w-20"
							on:click={toggle}
						>
							{btnText}
						</button>
					</div>
				</div>
			</header>
			<Footer info={time} />
		</div>
	</div>
{/if}

<style>
	button {
		@apply font-bold;
	}
	.on {
		@apply bg-red-600 mx-3;
	}
	.off {
		@apply bg-red-950 mx-3;
	}

	.btn-on {
		@apply variant-filled-warning;
	}
	.btn-off {
		@apply variant-filled-tertiary;
	}

	.text-on {
		@apply text-green-400;
	}
	.text-off {
		@apply text-gray-500;
	}
</style>
