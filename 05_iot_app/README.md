# 05_iot_app


## Run the application

`cd` in to the `05_iot_app` and run the command `npm run dev`


## Hide setting/configuration files

Open the `settings.json` in the `.vscode` and add the following lines:

```

{
    "svelte.enable-ts-plugin": true,
    "files.exclude": {
        "**/.eslintignore": true,
        "**/.eslintrc.cjs": true,
        "**/.gitignore": true,
        "**/.npmrc": true,
        "**/.prettierignore": true,
        "**/.prettierrc": true,
        "**/.svelte-kit": true,
        "**/node_modules": true,
        "**/package-lock.json": true,
        "**/package.json": true,
        "**/postcss.config.cjs": true,
        "**/static": true,
        "**/svelte.config.js": true,
        "**/tailwind.config.cjs": true,
        "**/tsconfig.json": true,
        "**/vite.config.js": true
    },
}

```

