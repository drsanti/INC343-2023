
<script lang="ts">    

    import { onMount } from "svelte";
    
    import { Mcu } from './scripts/mcu';

    import type { McuResponse } from './scripts/mcu';

    import Utils from './scripts/utils';


   
    let responseJson: McuResponse;
    let dateTime = "";
    let isOk = true;
    let cls = "jv";

    onMount(async() => {
        Mcu.initialize();
    });


    const updateDateTime = () => {
        dateTime = `${Utils.getDateTime()}`;
    }

    const clicked = async (e: any) : Promise<void> => {
       const id = e.target.attributes.id.value;
       const json = await Mcu.sendCommand(`led/${id}/inv`);
       responseJson = json;
       isOk = responseJson.status != "failed";
       updateDateTime();
       Mcu.printJsonAsTable("MCU Response", responseJson);
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

    {#if responseJson && JSON.stringify(responseJson) !== '{}'}
        <p>{dateTime}</p>
        <div class="jc">
            <p>{`{`}</p>
            {#each Object.entries(responseJson) as [key, value], index (key)}
                <div class="flex">
                    <span class="jk">{key}</span> : 
                    {#if key==="status" && !isOk}<span class="je">{value}</span>
                    {:else if key==="status" && isOk} <span class="jo">{value}</span>
                    {:else}<span class="jv">{value}</span>{/if}
                </div>
            {/each}
            <p>{`}`}</p>
        </div>
    {/if}
</div>

<style>
    
    .jc{/* JSON container */
        @apply flex flex-col w-full indent-4 bg-black m-2 p-4 rounded-md text-gray-500;
    }
    .jk{/* JSON key */
        @apply flex indent-8 w-24 text-lime-600;
    }
    .jv{/* JSON value */
        @apply flex indent-4 text-blue-500;
    }
    .je{
        @apply flex indent-4 text-red-400; 
    }
    .jo{
        @apply flex indent-4 text-lime-400; 
    }

</style>