<h1 class="text-3xl bg-black-500 p-4">Chapter A - Flex (move elements to center)</h1>
<ol class="flex flex-col pl-12 list-decimal text-yellow-200">
    <li>flex</li>
    <li>flex items-center</li>
    <li>flex justify-center</li>
</ol>

<br>

<!-- This style will be applied to all div elements -->
<style>
    div{
        border: 1px solid gray;
    }
</style>



<h1>No flex</h1>
<div>
    <div class="bg-red-300">box 01</div>
    <div class="bg-red-500">box 02</div>
    <div class="bg-red-700">box 03</div>
    <div class="bg-red-900">box 04</div>
</div>

<br>

<h1>flex</h1>
<div class="flex">
    <div class="bg-green-300">box 01</div>
    <div class="bg-green-500">box 02</div>
    <div class="bg-green-700">box 03</div>
    <div class="bg-green-900">box 04</div>
    <!-- The div container is assigned to flex class -->
</div>

<br>

<h1>flex h-x</h1>
<div class="flex h-14">
    <div class="bg-orange-300 h-9">box 01</div> 
    <div class="bg-orange-500"    >box 02</div>
    <div class="bg-orange-700 h-9">box 03</div>
    <div class="bg-orange-900"    >box 04</div>
    <!-- Height of the box01 and box09 are changed to h-9  -->
    <!-- Height of the box02 and box04 are inherited from their parent, the div container -->
    <!-- Note: h-x is not flex property, it is a tailwind property -->
</div>

<br>

<h1>flex w-x h-x</h1>
<div class="flex w-80 h-14">
    <div class="bg-yellow-300 h-9" >box 01</div> 
    <div class="bg-yellow-500 w-24">box 02</div>
    <div class="bg-yellow-700 h-9" >box 03</div>
    <div class="bg-yellow-900 w-24">box 04</div>
    <!-- Height of the box01 and box02 are changed to h-9  -->
    <!-- Height of yhe box02 and box04 are inherited from their parent, the div container -->
     <!-- Note: h-x and w-x are not flex properties, they are the tailwind properties -->
</div>

<br>


<h1>flex items-center</h1>
<div class = "flex items-center h-14 ">
    <div class="bg-blue-300 w-32 h-14">box 01</div>
    <div class="bg-blue-500 w-20 h-8" >box 02</div>
    <div class="bg-blue-700 w-32 h-14">box 03</div>
    <div class="bg-blue-900 w-20 h-8" >box 04</div>
    <!-- flex items-center moves all child elements to vertical center -->
</div>

<br>


<h1>flex justify-center</h1>
<div class = "flex justify-center">
    <div class="bg-pink-300 w-32 h-14">box 01</div>
    <div class="bg-pink-500 w-20 h-8" >box 02</div>
    <div class="bg-pink-700 w-32 h-14">box 03</div>
    <div class="bg-pink-900 w-20 h-8" >box 04</div>
    <!-- flex justify-center moves all child elements to horizontal center -->
</div>

<br>

<h1>flex items-center justify-center</h1>
<div class = "flex items-center justify-center">
    <div class="bg-purple-300 w-32 h-14">box 01</div>
    <div class="bg-purple-500 w-20 h-8" >box 02</div>
    <div class="bg-purple-700 w-32 h-14">box 03</div>
    <div class="bg-purple-900 w-20 h-8" >box 04</div>
    <!-- flex justify-center moves all child elements to horizontal center -->
</div>

<br>


<h1>flex items-center justify-center (both parent and child)</h1>
<div class = "flex items-center justify-center">
    <div class="flex items-center justify-center bg-sky-300 w-32 h-14">box 01</div>
    <div class="flex items-center justify-center bg-sky-500 w-20 h-8" >box 02</div>
    <div class="flex items-center justify-center bg-sky-700 w-32 h-14">box 03</div>
    <div class="flex items-center justify-center bg-sky-900 w-20 h-8" >box 04</div>
    <!-- flex justify-center moves all child elements to horizontal center -->
</div>