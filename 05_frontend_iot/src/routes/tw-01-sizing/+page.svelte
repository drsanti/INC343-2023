<h1 class="text-3xl bg-black-500 p-4">Sizing</h1>

<ol class="col pl-12 list-decimal text-yellow-200">
    <li>w-x</li>
    <li>h-x</li>
    <li>max-w-x</li>
</ol>

<br>

<!-- This style will be applied to all div elements -->
<style>
    div{
        border: 1px solid gray;
    }
</style>


<h1>Container</h1>
<div class="flex bg-gray-900 p-1">
    boxes will be here
</div>

<br>

<h1>No sizing</h1>
<div class="flex bg-gray-900 p-1">
    <div>box 01</div>
    <div>box 02</div>
    <div>box 03</div>
    <div>box 04</div>
</div>

<br>

<h1>No sizing with background color</h1>
<div class="flex bg-gray-900 p-1">
    <div class="bg-red-900">box 01</div>
    <div class="bg-red-700">box 02</div>
    <div class="bg-red-500">box 03</div>
    <div class="bg-red-300">box 04</div>
</div>

<br>

<h1>w-x sizing</h1>
<div class="flex bg-gray-900 p-1">
    <div class="bg-green-900 w-52">box 01</div>
    <div class="bg-green-700 w-44">box 02</div>
    <div class="bg-green-500 w-32">box 03</div>
    <div class="bg-green-300 w-24">box 04</div>
    <!-- Resize the browser window to check the changes of their size -->
    <!-- https://tailwindcss.com/docs/width -->
</div>

<br>

<h1>h-x sizing</h1>
<div class="flex bg-gray-900 p-1">
    <div class="bg-blue-900 h-10">box 01</div>
    <div class="bg-blue-700 h-12">box 02</div>
    <div class="bg-blue-500 h-14">box 03</div>
    <div class="bg-blue-300 h-16">box 04</div>
    <!-- https://tailwindcss.com/docs/height -->
</div>

<br>

<h1>w-x and h-x sizing</h1>
<div class="flex bg-gray-900 p-1">
    <div class="bg-pink-900 w-52 h-10">box 01</div>
    <div class="bg-pink-700 w-44 h-12">box 02</div>
    <div class="bg-pink-500 w-32 h-14">box 03</div>
    <div class="bg-pink-300 w-24 h-16">box 04</div>
</div>

<br>

<h1>max-w-x sizing</h1>
<div class="flex flex-col bg-gray-900 p-1">
    <div class="bg-purple-900 flex justify-center max-w-xs">box 01</div>
    <div class="bg-purple-800 flex justify-center max-w-sm">box 02</div>
    <div class="bg-purple-700 flex justify-center max-w-md">box 03</div>
    <div class="bg-purple-600 flex justify-center max-w-lg">box 04</div>
    <div class="bg-purple-500 flex justify-center max-w-xl">box 05</div>
    <div class="bg-purple-400 flex justify-center max-w-2xl">box 06</div>
    <!-- 
        To see their behaviors clearly, add `flex flex-col` to the parent 
        and add `flex justify-center` to child elements.  Resize the
        browser window to see the changes. 
    -->
</div>

<br>

<h1>min-w-x sizing</h1>
<div class="flex flex-col items-center bg-gray-900 p-1">
    <div class="bg-red-900 w-22 min-w-full hover:min-w-0">box 01</div>
    <div class="bg-red-700 w-22 md:min-w-full">box 02</div>
    <div class="bg-red-500 w-22 lg:min-w-full">box 03</div>

     <!-- 
        To see their behaviors clearly, add `flex flex-col items-center` to the parent 
        add the `min-w-x`to child elements. Hover mouse to the box01. Resize the
        browser window to see the changes of the box02 and box03.
    -->
</div>


<!-- 
    Note:
      The `max-h-x and min-h-x` work as the same way.
      Check the links below:
       https://tailwindcss.com/docs/min-height
       https://tailwindcss.com/docs/max-height


 -->