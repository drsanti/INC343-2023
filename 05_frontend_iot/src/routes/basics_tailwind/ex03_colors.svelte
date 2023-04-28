
<!------------------- Background color ------------------->
<div id="box1">
    <div class="bg-red-100">01</div>
    <div class="bg-red-200">02</div>
    <div class="bg-red-300">03</div>
    <div class="bg-red-400">04</div>
    <div class="bg-red-500">05</div>
    <div class="bg-red-600">06</div>
    <div class="bg-red-700">07</div>
    <div class="bg-red-800">08</div>
    <div class="bg-red-900">09</div>
    <!-- https://tailwindcss.com/docs/background-color -->
</div>


<!------------------- Text color ------------------->
<div id="box1">
    <div class="bg-black text-orange-100">01</div>
    <div class="bg-black text-orange-200">02</div>
    <div class="bg-black text-orange-300">03</div>
    <div class="bg-black text-orange-400">04</div>
    <div class="bg-black text-orange-500">05</div>
    <div class="bg-black text-orange-600">06</div>
    <div class="bg-black text-orange-700">07</div>
    <div class="bg-black text-orange-800">08</div>
    <div class="bg-black text-orange-900">09</div>
    <!-- https://tailwindcss.com/docs/text-color -->
</div>



<style>
    #box1 {
        @apply flex bg-gray-800 justify-evenly border m-2 p-2;   
    }

    div{
        @apply px-1 border border-gray-500 rounded-md;
    }
</style>

