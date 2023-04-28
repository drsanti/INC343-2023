
<!------------------- Text/Font Size ------------------>
<div id="box1">
    <span class="text-xs">01</span>
    <span class="text-sm">02</span>
    <span class="text-base">03</span>
    <span class="text-md">04</span>
    <span class="text-lg">05</span>
    <span class="text-xl">06</span>
    <span class="text-2xl">07</span>
    <span class="text-3xl">08</span>
    <span class="text-4xl">09</span>
    <!-- https://tailwindcss.com/docs/font-size -->
</div>

<!------------------- Text Align ------------------>
<div id="box2">
    <p class="text-left">01</p>
    <p class="text-center">02</p>
    <p class="text-right">03</p>
    <p class="text-justify">04</p>
    <p class="text-start">05</p>
    <p class="text-end">06</p>
    <!-- https://tailwindcss.com/docs/text-align -->
</div>


<!------------------ Text Indent ------------------>
<div id="box2">
    <h5 class="indent-0">01</h5>
    <h5 class="indent-2">02</h5>
    <h5 class="indent-4">03</h5>
    <h5 class="indent-6">04</h5>
    <h5 class="indent-8">05</h5>
    <h5 class="indent-10">06</h5>
    <h5 class="indent-12">07</h5>
    <h5 class="indent-14">08</h5>
    <h5 class="indent-16">09</h5>
    <!-- https://tailwindcss.com/docs/text-indent -->
</div>


<style>
    #box1 {
        @apply flex bg-gray-800 justify-evenly border m-2 p-2;   
    }

    #box2 {
        @apply flex flex-col bg-gray-800 justify-evenly border m-2 p-2;   
    }

    span {
        @apply flex px-2 border border-yellow-300 rounded-md text-cyan-400 items-center;
    }

    p{
        @apply px-2 border border-cyan-800 text-orange-400 w-full;
    }

    h5{
        @apply flex px-2 border border-gray-400 text-lime-400 w-full bg-purple-900;
    }

</style>