
<!------------------------- flex grow  --------------------------->
<div class="flex p-2 mt-4 bg-green-900">
    <span class="flex-none w-32 h14">01</span>
    <span class="flex-grow w-32 h14">02</span>
    <span class="flex-nonw w-32 h14">03</span>
    <!-- Resize the browser window to check the result -->
    <!-- https://tailwindcss.com/docs/flex-grow -->
</div>

<!------------------------ flex shrink  -------------------------->
<div class="flex p-2 mt-4 bg-green-900">
    <span class="flex-none w-64 h14">01</span>
    <span class="flex-shrink w-64 h14">02</span>
    <span class="flex-none w-64 h14">03</span>
     <!-- Resize the browser window to check the result -->
     <!-- https://tailwindcss.com/docs/flex-shrink -->
</div>

<style>
    span{
        @apply border border-yellow-200 px-2 rounded-md bg-purple-800;
    }
</style>