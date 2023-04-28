<!---------------------- JavaScript ---------------------->
<script>
    console.log("Hello Svelte");

</script>


<!------------------------- HTML ------------------------->
<!-- HTML can be added here -->
<div>
    <button>CLick Me</button>
    
</div>


<!------------------------ style ------------------------->
<style>
    /* CSS can be added here */

    /** Tailwind utility classes can be used by prefixing `@apply` */
    div{
        @apply flex bg-blue-700 p-1 justify-center;  /* <=============== Tailwind */
    }
    
    /** Normal CSS */
    button{
        border: 1px solid yellow;
        border-radius: 8px;
        padding: 8px;
    }

</style>

