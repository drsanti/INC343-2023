<!------------------- Border Width ------------------>
<div id="box1">
    <span class="border-0   border-red-500">01</span>
    <span class="border     border-red-500">02</span>
    <span class="border-2   border-red-500">03</span>
    <span class="border-4   border-red-500">04</span>
    <span class="border-x   border-red-500">05</span>
    <span class="border-x-2 border-red-500">06</span>
    <span class="border-y   border-red-500">07</span>
    <span class="border-y-2 border-red-500">08</span>
    <span class="border-t-2 border-red-500">09</span>
    <!-- https://tailwindcss.com/docs/border-width -->
</div>


<!------------------- Border Color ------------------>
<div id="box1">
    <span class="border-2 border-cyan-100">01</span>
    <span class="border-2 border-cyan-200">02</span>
    <span class="border-2 border-cyan-300">03</span>
    <span class="border-2 border-cyan-400">04</span>
    <span class="border-2 border-cyan-500">05</span>
    <span class="border-2 border-cyan-600">06</span>
    <span class="border-2 border-cyan-700">07</span>
    <span class="border-2 border-cyan-800">08</span>
    <span class="border-2 border-cyan-900">09</span>
    <!-- https://tailwindcss.com/docs/border-color -->
</div>


<!------------------- Border Radius ------------------>
<div id="box1">
    <span class="border-2 border-lime-400 rounded-none">01</span>
    <span class="border-2 border-lime-400 rounded-sm">02</span>
    <span class="border-2 border-lime-400 rounded">03</span>
    <span class="border-2 border-lime-400 rounded-md">04</span>
    <span class="border-2 border-lime-400 rounded-lg">05</span>
    <span class="border-2 border-lime-400 rounded-xl">06</span>
    <span class="border-2 border-lime-400 rounded-2xl">07</span>
    <span class="border-2 border-lime-400 rounded-3xl">08</span>
    <span class="border-2 border-lime-400 rounded-full">09</span>
    <!-- https://tailwindcss.com/docs/border-radius -->
</div>


<!------------------- Border Style ------------------>
<div id="box1">
    <span class="border-2 border-purple-300 border-solid">01</span>
    <span class="border-2 border-purple-300 border-dashed">02</span>
    <span class="border-2 border-purple-300 border-dotted">03</span>
    <span class="border-2 border-purple-300 border-double">04</span>
    <span class="border-2 border-purple-300 border-hidden">05</span>
    <span class="border-2 border-purple-300 border-none">06</span>
    <span class="border-2 border-purple-300 border-dotted">07</span>
    <span class="border-2 border-purple-300 border-double">08</span>
    <span class="border-2 border-purple-300 border-dashed">09</span>
    <!-- https://tailwindcss.com/docs/border-style -->
</div>



<style>
    #box1 {
        @apply flex bg-gray-800 justify-evenly border m-2 p-2;   
    }

    div{
        @apply px-1 border border-gray-500 rounded-md;
    }

    span{
        @apply bg-black text-yellow-300 px-2;
    }

</style>