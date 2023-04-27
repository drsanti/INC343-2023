



<script lang="ts">    
    import { onMount } from "svelte";
    import Mcu from './scripts/mcu';
   
    let mcu: Mcu;
    onMount(async() => {
        mcu = new Mcu();
        // mcu.sendCommand(`led/0/on`).then( (json) => {
        //     mcu.printJsonAsTable("MCU Response", json);
        // });

        // const json = await mcu.sendCommand(`led/0/on`);
        // mcu.printJsonAsTable("MCU Response", json);

    });

    const clicked = async (e: any) : Promise<void> => {
       const id = e.target.attributes.id.value;
       const json = await mcu.sendCommand(`led/${id}/inv`);
       mcu.printJsonAsTable("MCU Response", json);

    }

</script>

<div class="flex flex-col justify-evenly items-center">

    <div class="btn-container">
        <button id="3" on:click={clicked} class="btn-led-inv bg-green-400">3-ON</button>
        <button id="2" on:click={clicked} class="btn-led-inv bg-green-500">2-ON</button>
        <button id="1" on:click={clicked} class="btn-led-inv bg-green-600">1-ON</button>
        <button id="0" on:click={clicked} class="btn-led-inv bg-green-700">0-ON</button>
    </div>

    <div class="btn-container">
        <button id="3" on:click={clicked} class="btn-led-inv bg-gray-400">3-OFF</button>
        <button id="2" on:click={clicked} class="btn-led-inv bg-gray-500">2-OFF</button>
        <button id="1" on:click={clicked} class="btn-led-inv bg-gray-600">1-OFF</button>
        <button id="0" on:click={clicked} class="btn-led-inv bg-gray-700">0-OFF</button>
    </div>


    <div class="btn-container">
        <button id="3" on:click={clicked} class="btn-led-inv bg-blue-400">3-INV</button>
        <button id="2" on:click={clicked} class="btn-led-inv bg-blue-500">2-INV</button>
        <button id="1" on:click={clicked} class="btn-led-inv bg-blue-600">1-INV</button>
        <button id="0" on:click={clicked} class="btn-led-inv bg-blue-700">0-INV</button>
    </div>

</div>


<style>
    
</style>













<!-- <p class="bg-green-900 text-blue-900">This is paragraph</p>
<p class="bg-green-700 text-yellow-100">This is paragraph</p>
<p class="bg-green-500 text-red-200">This is paragraph</p>
<p class="bg-green-300 text-red-500">This is paragraph</p>
<p class="bg-green-100 text-red-700">This is paragraph</p>


 -->




<!-- <div class="flex flex-col text-3xl items-center">
    <ol class="list-decimal">
        <li class="hover:text-yellow-300 pt-8"><a href="tw-01-sizing">Sizing</a></li>
        <li class="hover:text-yellow-300 pt-8"><a href="tw-02-center">Flex (center)</a></li>
    </ol>
</div> -->

