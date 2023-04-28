
<script lang="ts">    

    import { onMount } from "svelte";
    
    import Mcu from './scripts/mcu';
   
    let mcu: Mcu;
    
    onMount(async() => {
        mcu = new Mcu();
    });

    const clicked = async (e: any) : Promise<void> => {
       const id = e.target.attributes.id.value;
       const json = await mcu.sendCommand(`led/${id}/inv`);
       mcu.printJsonAsTable("MCU Response", json);
    }

</script>

<div class="flex flex-col justify-evenly items-center">


    <div class="flex h-24 w-full items-center justify-center bg-black rounded-lg">
        <p>Please start the SERVER before click the buttons</p>
    </div>


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
