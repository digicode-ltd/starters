##react+ts+webpack app

```
npm i
npm run build
```

In current repository we use some rules and approaches so:

- follow _**gitflow**_ approach.
- follow common code style, using **_editorconfig_**, **_prettier_** and **_tslint_**
- **_tslint.json_** can be modified in future in case if some style are annoying for specific code
- before pushing code to origin please **_resolve_** all linter warnings and errors and **_format_** code

to check linter's warnings and errors:

```
npm run lint
```

to format code by prettier for active opened file use:

```
webstorm: Ctrl+Alt+Shif+P
```

to enable linter warning directly in editor:

```
webstorm: File -> Setting -> Languages & Frameworks -> TypeScript -> TSLint -> Enable
```

to format code by prettier for all ts files use:

```
npm run format
```

to fix linter issues by linter use:

```
npm run lint-fix
```
