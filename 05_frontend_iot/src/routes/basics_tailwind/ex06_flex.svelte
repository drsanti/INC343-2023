
<!------------------------- No flex  --------------------------->
<div class="p-2 mt-4 bg-red-900"> 
    <span class="w-96 h-10">01</span>
    <span class="w-96 h-10">02</span>
    <span class="w-96 h-10">03</span>
    <span class="w-96 h-10">04</span>
    <span class="w-96 h-10">05</span>
    <!-- The parent element (div) has no flex, 
        the w-x and h-x not affect to the child elements (spans) -->
    <!-- Resize the browser window to check the result -->

    <!-- https://tailwindcss.com/docs/flex -->
</div>

<!-------------------------- flex  ---------------------------->
<div class="flex p-2 mt-4 bg-green-900">
    <span class="w-96 h-10">01</span>
    <span class="w-96 h-10">02</span>
    <span class="w-96 h-10">03</span>
    <span class="w-96 h-10">04</span>
    <span class="w-96 h-10">05</span>
    <!-- The parent element (div) has flex property,
         the w-x and h-x affect to the size of child elements (spans) -->
    <!-- Resize the browser window to check the result -->

    <!-- https://tailwindcss.com/docs/flex -->
</div>



<!-------------------------- flex-none ---------------------------->
<div class="flex p-2 mt-4 bg-blue-900">
    <span class="w-48 h-10 flex-none">01</span>
    <span class="w-48 h-10">02</span>
    <span class="w-48 h-10flex-none">03</span>
    <span class="w-48 h-10">04</span>
    <span class="w-48 h-10">05</span>
    <!-- `flex-none` does not allows item from growing or shrinking -->
    <!-- Resize the browser window to check the result -->

    <!-- https://tailwindcss.com/docs/flex -->
</div>


<!------------------------ flex-initial --------------------------->
<div class="flex p-2 mt-4 bg-yellow-900">
    <span class="w-48 h-10 flex-initial">01</span>
    <span class="w-48 h-10 flex-none">02</span>
    <span class="w-48 h-10 flex-initial">03</span>
    <span class="w-48 h-10 flex-none">04</span>
    <span class="w-48 h-10 flex-none">05</span>
    <!-- `flex-initial` allows item shrink but not grow -->
    <!-- Resize the browser window to check the result -->

    <!-- https://tailwindcss.com/docs/flex -->
</div>


<!------------------------ flex-1 --------------------------->
<div class="flex p-2 mt-4 bg-gray-700">
    <span class="w-48 h-10 flex-1">01</span>
    <span class="w-48 h-10 flex-none">02</span>
    <span class="w-48 h-10 flex-1">03</span>
    <span class="w-48 h-10 flex-none">04</span>
    <span class="w-48 h-10 flex-none">05</span>
    <!-- `flex-1` allows item shrink and grow -->
    <!-- Resize the browser window to check the result -->

    <!-- https://tailwindcss.com/docs/flex -->
</div>



<!----------------------- flex-auto ------------------------->
<div class="flex p-2 mt-4 bg-indigo-700">
    <span class="w-24 h-10 flex-auto">01</span>
    <span class="w-48 h-10 flex-none">02</span>
    <span class="w-48 h-10 flex-auto">03</span>
    <span class="w-48 h-10 flex-none">04</span>
    <span class="w-48 h-10 flex-none">05</span>
    <!-- `flex-1` allows item shrink and grow, taking into account its initial size -->
    <!-- Resize the browser window to check the result -->

    <!-- https://tailwindcss.com/docs/flex -->
</div>


<style>
    span{
        @apply border border-yellow-200 px-2 rounded-md bg-purple-800;
    }
</style>