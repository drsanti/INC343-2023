# 05_frontend_iot


## Install Node.js
Node.js version 18 or higher is required.
To check the version of the Node.js, run the command `node -v`


## Install dependencies

`cd` into the `05_frontend_iot` and run the command `npm install`


## Run the server

`cd` in to the `05_frontend_oit` and run the command `npm run dev`.
Press `CMD` and click the `url` `to open the application on a default web browser.


## Hide setting/configuration files (optional)

Open the `settings.json` in the `.vscode` and add the following lines:

```js

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

## Disable Warning message on `@apply`
 - Install `Stylelint` extension.
 - create a new file name `stylelint.config.js`.
 - Add the following lines in the `stylelint.config.js`.

```js

module.exports = {
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen']
            }
        ],
        'declaration-block-trailing-semicolon': null,
        'no-descending-specificity': null
    }
}

```

- Add these two lines in to the `settings.json`

```js

"scss.validate": false,
"css.validate": false

```
