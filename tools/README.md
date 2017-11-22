# Tools documentation

This document contains information about the tools section of the `angular-seed`.

## General Information

The root of this folder contains the following files:

| Filename     | Description |
| :----------- | :---------- |
| `.gitignore` | Adds the generated `*.js` and `.js.map` files to the list of ignores files for git |
| `config.ts`  | Exports the project configuration, which contains of the basic configuration provided by `/config/seed.config.ts` and the project specific overrides defined by `/config/project.config.ts` |
| `debug.ts`   | Provides the ability to debug a specific build task |
| `README.md`  | The documentation of the tools section |
| `utils.ts`   | Exports the utilities provided by the seed barrel file (`/utils/seed.utils.ts`) and the project specific barrel file (`/utils/project.utils.ts`) |

The subfolders provide further folders to distinguish between files which are provided by the seed (located in the corresponding `seed` folder) and files which can be specific by project (to be located in the corresponding `project` folder). This helps you to include updates from the `angular-seed` without causing conflicts with your personal customisations.

## Configuration

The configuration of the seed contains of a basic configuration provided by `/config/seed.config.ts` file. You can add your own custom configuration within the `/config/project.config.ts` file, which extends the seed configuration.

## Environment Configuration

The environment configuration files in `/tools/env` provide a way for you to set and override configuration settings based on a given environment. The `/tools/env/base.ts` configuration is set up in all environments (dev|test|staging|prod), whereas the `/tools/env/dev.ts` is specific to the dev environment, as is `/tools/env/prod.ts` specific to the prod environment.

## Manual Typings

The `manual_typings` folder contains manual TypeScript typings provided by the seed (`/manual_typings/seed`) and project specific TypeScript typings (`/manual_typings/project`). As for the project specific typings there is a sample provided (`/manual_typings/project/sample.package.d.ts`) to help you get started.

## Tasks

The `tasks` folder contains tasks provided by the seed (`/tasks/seed`) and project specific tasks (`/tasks/project`). As for the project specific tasks there is a sample provided (`/tasks/project/sample.task.ts`) to help you get started.

The seed provides the following tasks:

| Filename                             | Description |
| :----------------------------------- | :---------- |
| `build.assets.dev.ts`                | Copies the assets (located in `src/client/assets`) over to the `dist/dev/assets` directory |
| `build.assets.prod.ts`               | Copies the assets (located in `src/client/assets`) over to the `dist/prod/assets` directory |
| `build.bundle.rxjs.ts`               | Bundles the RxJS lib using the SystemJS Builder |
| `build.bundles.app.aot.ts`           | Bundles the JavaScript files using the SystemJS Builder with AoT |
| `build.bundles.app.rollup.aot.ts`    | Bundles the JavaScript files using the SystemJS Builder with Roolup and AoT |
| `build.bundles.app.ts`               | Bundles the JavaScript files using the SystemJS Builder |
| `build.bundles.ts`                   | Bundles the JavaScript shim dependencies |
| `build.docs.ts`                      | Builds the documentation for the TypeScript files using `typedoc` |
| `build.html_css.ts`                  | Builds the `html` and `css` files and applies CSS postprocessing |
| `build.index.dev.ts`                 | Builds the `index.html` for the `dev` environment |
| `build.index.prod.ts`                | Builds the `index.html` for the `prod` environment |
| `build.js.dev.ts`                    | Transpiles the TypeScript files (excluding specs and e2e specs) for the `dev` environment |
| `build.js.e2e.ts`                    | Transpiles the TypeScript files (excluding specs and e2e specs) for the `e2e` environment |
| `build.js.prod.ts`                   | Transpiles the TypeScript files (excluding specs and e2e specs) for the `prod` environment |
| `build.js.test.ts`                   | Transpiles the TypeScript files (excluding specs and e2e specs) for the `test` environment |
| `build.sme.prod.aot.ts`              | Creates source-map-explorer report for the `prod.aot` task |
| `build.sme.prod.rollup.aot.ts`       | Creates source-map-explorer report for the `prod.rollup.aot` task |
| `build.sme.prod.ts`                  | Creates source-map-explorer report for the `prod` task |
| `build.tools.ts`                     | Transpiles the TypeScript files located in `/tools` + `/gulpfile.ts` |
| `check.tools.ts`                     | Checks if the build.tools task has been run, if so runs clean.tools then build.tools |
| `check.versions.ts`                  | Checks if the required Node and NPM (as defined in `/config/seed.config.ts`) are installed |
| `clean.all.ts`                       | Cleans all files within the `/dist` directory |
| `clean.coverage.ts`                  | Cleans all files within the `/coverage` directory |
| `clean.dev.ts`                       | Cleans all files within the `/dist/dev` directory |
| `clean.prod.ts`                      | Cleans all files within the `/dist/prod` directory |
| `clean.sme.ts`                       | Cleans all files within the `sme` directory |
| `clean.tools.ts`                     | Cleans all JavaScript files which were transpiled by the build.tools task  |
| `clear.files.ts`                     | Cleans all `.js`, `.js.map`, `.metadata.json` files from source and tools directories  |
| `compile.ahead.prod.ts`              | Compile bundles with AoT |
| `copy.prod.rollup.aot.ts`            | Copies all TypeScript files (excluding specs and e2e specs) over to the `/tmp` dir before AoT, Rollup compilation |
| `copy.prod.ts`                       | Copies all TypeScript files (excluding specs and e2e specs) over to the `/tmp` dir |
| `e2e.ts`                             | Runs all e2e specs using `protractor` |
| `generate.manifest.ts`               | Generates a `manifest` file for the application |
| `i18n.build.ts`                      | Run sequence of tasks `clean.prod`, `copy.prod` and `build.html_css` |
| `i18n.merge.ts`                      | Add `i18n` translation in to the files  |
| `karma.run.ts`                       | Run Karma server and using `Config.getKarmaReporters()` configuration |
| `karma.run.with_coverage.ts`         | Run Karma server with coverage and using `Config.getKarmaReporters()` configuration |
| `karma.run.without_coverage.ts`      | Run Karma server without coverage and using `Config.getKarmaReporters()` configuration |
| `karma.watch.ts`                     | Run Karma server in `watch` mode and using `Config.getKarmaReporters()` configuration |
| `minify.bundles.ts`                  | Minify `shims.js` and `app.js` files in `dist/dev` or `dist/prod` with or without `SourceMaps`, related to `build-type` flag  |
| `minify.index.ts`                    | Minify `index.html` page in `dist/dev` or `dist/prod`, related to `environment` flag |
| `noop.ts`                            | Empty arrow `function` |
| `print.banner.ts`                    | Prints banner after `npm install` or `yarn install` in terminal |
| `serve.coverage.ts`                  | Serves the unit test coverage report using an `express` server |
| `serve.coverage.watch.ts`            | Serves the unit test coverage report using an `express` server in `watch` mode |
| `serve.docs.ts`                      | Serves the application documentation using an `express` server |
| `server.prod.ts`                     | Serves the files from `/dist/prod` using an `express` server |
| `server.start.ts`                    | Serves the files from `/dist/dev` using an `express` server |
| `start.deving.ts`                    | Apply `live-reload` for `express` server in development mode |
| `sw.manifest.static.ts`              | Generate `.manifest` file for `service-worker` |
| `test.watch.ts`                      | Run unit tests in `watch` mode  |
| `transpile.bundles.rollup.aot.ts`    | Transpiling bundles after Rollup, AoT compilation |
| `tslint.ts`                          | Lints the TypeScript files using `codelyzer` |
| `watch.dev.ts`                       | Watches for code changes and rebuilds the files in `/dist/dev` |
| `watch.e2e.ts`                       | Watches for code changes and rebuilds the files in `/dist/e2e` |
| `watch.test.ts`                      | Watches for code changes and rebuilds the files in `/dist/test` |
| `webdriver.ts`                       | Installs the Selenium webdriver used for the Protractor e2e specs |

## Utilities

The `utils` folder contains utilities provided by the seed (`/utils/seed`) and project specific utilities (`/utils/project`). As for the project specific utilities there is a sample provided (`/utils/project/sample_util.ts`) to help you get started.

The utilities are exported by the barrel files `project.utils.ts` (for the project specific utilities) and `seed.utils.ts` (for the utilities provided by the seed).

The seed provides the following utilities:

| Filename               | Description |
| :--------------------- | :---------- |
| `build_optimizer.ts`   | Provides build optimization with `@angular-devkit/build-optimizer` |
| `clean.ts`             | Provides a utility to clean files and directories |
| `code_change_tools.ts` | Provides utilities to make use of BrowserSync to refresh the browser after a code change |
| `karma.start.ts`       | Provides utilities to start Karma server with configuration |
| `server.ts`            | Provides utilities to start `express` servers for the application, the documentation and the unit test coverage |
| `sme.ts`               | Provides utilities to create `source-map-explorer` reports |
| `task_tools.ts`        | Provides utilities to start tasks (matching task names as string input parameters from the `gulpfile.ts` to the corresponding files) |
| `template_locals.ts`   | Provides a utility for template locals |
| `tsproject.ts`         | Provides a utility to configure the TypeScript transpilation |
| `watch.ts`             | Provides a utility to watch for file changes and notify live reloads |

