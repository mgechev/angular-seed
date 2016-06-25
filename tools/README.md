# Tools documentation

This document contains information about the tools section of the `angular2-seed`.

## General Information

The root of this folder contains the following files:

| Filename     | Description |
| :----------- | :---------- |
| `.gitignore` | Adds the generated `*.js` and `.js.map` files to the list of ignores files for git |
| `config.ts`  | Exports the project configuration, which contains of the basic configuration provided by `/config/seed.config.ts` and the project specific overrides defined by `/config/project.config.ts` |
| `debug.ts`   | Provides the ability to debug a specific build task |
| `README.md`  | The documentation of the tools section |
| `utils.ts`   | Exports the utilities provided by the seed barrel file (`/utils/seed.utils.ts`) and the project specific barrel file (`/utils/project.utils.ts`) |

The subfolders provide further folders to distinguish between files which are provided by the seed (located in the corresponding `seed` folder) and files which can be specific by project (to be located in the corresponding `project` folder). This helps you to include updates from the `angular2-seed` without causing conflicts with you personal customisations.

## Configuration

The configuration of the seed contains of a basic configuration provided by `/config/seed.config.ts` file. You can add you own custom configuration within the `/config/project.config.ts` file, which extends the seed configuration.

## Manual Typings

The `manual_typings` folder contains of manual TypeScript typings provided by the seed (`/manual_typings/seed`) and project specific TypeScript typings (`/manual_typings/project`). As for the project specific typings there is a sample provided (`/manual_typings/project/sample.package.d.ts`) to help you get started.

## Tasks

The `tasks` folder contains of tasks provided by the seed (`/tasks/seed`) and project specific tasks (`/tasks/project`). As for the project specific tasks there is a sample provided (`/tasks/project/sample.task.ts`) to help you get started.

The seed provides the following tasks:

| Filename               | Description |
| :--------------------- | :---------- |
| `build.assets.dev.ts`  | Copies the assets (located in `src/client/assets`) over to the `dist/dev/assets` directory |
| `build.assets.prod.ts` | Copies the assets (located in `src/client/assets`) over to the `dist/prod/assets` directory |
| `build.bundles.app.ts` | Bundles the JavaScript files using the SystemJS Builder |
| `build.bundles.ts`     | Bundles the JavaScript shim dependencies |
| `build.docs.ts`        | Builds the documentation for the TypeScript files using `typedoc` |
| `build.html_css.ts`    | Builds the `html` and `css` files and applies css postprocessing |
| `build.index.dev.ts`   | Builds the `index.html` for the `dev` environment |
| `build.index.prod.ts`  | Builds the `index.html` for the `prod` environment |
| `build.js.dev.ts`      | Transpiles the TypeScript files (excluding specs and e2e specs) for the `dev` environment |
| `build.js.e2e.ts`      | Transpiles the TypeScript files (excluding specs and e2e specs) for the `e2e` environment |
| `build.js.prod.ts`     | Transpiles the TypeScript files (excluding specs and e2e specs) for the `prod` environment |
| `build.js.test.ts`     | Transpiles the TypeScript files (excluding specs and e2e specs) for the `test` environment |
| `build.js.tools.ts`    | Transpiles the TypeScript files located in `/tools` |
| `check.versions.ts`    | Checks if the required Node and NPM (as defined in `/config/seed.config.ts`) are installed |
| `clean.all.ts`         | Cleans all files within the `/dist` directory |
| `clean.dev.ts`         | Cleans all files within the `/dist/dev` directory |
| `clean.prod.ts`        | Cleans all files within the `/dist/prod` directory |
| `clean.tools.ts`       | Cleans all JavaScript files (which got transpiled from the TypeScript files) within the `/tools` directory  |
| `copy.js.prod.ts`      | Copies all TypeScript files (exluding specs and e2e specs) over to the `/tmp` dir |
| `css-lint.ts`          | Lints all `css` files using `stylelint` |
| `e2e.ts`               | Runs all e2e specs using `protractor` |
| `generate.manifest.ts` | Generates a `manifest` file for the application |
| `karma.start.ts`       | Starts the unit tests using `karma` |
| `serve.coverage.ts`    | Serves the unit test coverage report using an `express` server |
| `serve.docs.ts`        | Serves the application documentation using an `express` server |
| `serve.prod.ts`        | Serves the files from `/dist/prod` using an `express` server |
| `serve.start.ts`       | Serves the files from `/dist/dev` using an `express` server |
| `tslint.ts`            | Lints the TypeScript files using `codelyzer` |
| `watch.dev.ts`         | Watches for code changes and rebuilds the files in `/dist/dev` |
| `watch.e2e.ts`         | Watches for code changes and rebuilds the files in `/dist/e2e` |
| `watch.test.ts`        | Watches for code changes and rebuilds the files in `/dist/test` |
| `webdriver.ts`         | Installs the Selenium webdriver used for the Protractor e2e specs |

## Utilities

The `utils` folder contains of utilities provided by the seed (`/utils/seed`) and project specific utilities (`/utils/project`). As for the project specific utilities there is a sample provided (`/utils/project/sample_util.ts`) to help you get started.

The utilities are exported by the barrel files `project.utils.ts` (for the project specific utilities) and `seed.utils.ts` (for the utilities provided by the seed).

The seed provides the following utilities:

| Filename               | Description |
| :--------------------- | :---------- |
| `clean.ts`             | Provides an utility to clean files and directories |
| `code_change_tools.ts` | Provides utilites to make use of BrowserSync to refresh the browser after a code change |
| `server.ts`            | Provides utilites to start `express` servers for the application, the documentation and the unit test coverage |
| `task_tools.ts`        | Provides utilites to start tasks (matching task names as string input parameters from the `gulpfile.ts` to the corresponding files) |
| `template_locals.ts`   | Provides an utiltiy for template locals |
| `tsproject.ts`         | Provides an utility to configure the TypeScript transpilation |
| `watch.ts`             | Provides an utility to watch for file changes and notify live reloads |