```
npm init svelte@next sveltekit-tailwindcss    
```


```
npm install -D tailwindcss postcss autoprefixer
```


```
npx tailwindcss init -p
```


Modify the `content`  in the `tailwind.config.cjs` as follow:

```
content: ['./src/**/*.{svelte, html, jsm ts}'],
```


Create `app.css` in `src` directory, and add the following lines:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Create `+layout.svelte` file in `src/routes` and add the following lines:

```
<script>
    import '../app.css';
</script>

<slot/>
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

```

Add a line below in the `+page.svelte` file:

```
<h1 class="text-3xl font-bold underline">Hello World</h1>
```


Add a new font by adding a line below to the `app.css`.

```
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
```

Then, add the following line into the `extend` in the `tailwind.config.cjs.`.
```
fontFamily: {
    body: ['Lato']
}
```








