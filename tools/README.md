# Tools documentation

This document contains information about the tools section of the `angular2-seed`.

## General Information

The root of this folder contains the following files:

* `.gitignore` - Adds the generated `*.js` and `.js.map` files to the list of ignores files for git
* `config.ts` - Exports the project configuration, which contains of the basic configuration provided by `/config/seed.config.ts` and the project specific overrides defined by `/config/project.config.ts`
* `debug.ts` - Provides the ability to debug a specific build task
* `README.md` - The documentation of the tools section
* `utils.ts` - Exports the utilities provided by the seed barrel file (`/utils/seed.utils.ts`) and the project specific barrel file (`/utils/project.utils.ts`) 

The subfolders provide further folders to distinguish between files which are provided by the seed (located in the corresponding `seed` folder) and files which can be specific by project (to be located in the corresponding `project` folder). This helps you to include updates from the `angular2-seed` without causing conflicts with you personal customisations.

## Configuration

The configuration of the seed contains of a basic configuration provided by `/config/seed.config.ts` file. You can add you own custom configuration within the `/config/project.config.ts` file, which extends the seed configuration.

## Manual Typings

The `manual_typings` folder contains of manual TypeScript typings provided by the seed (`/manual_typings/seed`) and project specific TypeScript typings (`/manual_typings/project`). As for the project specific typings there is a sample provided (`/manual_typings/project/sample.package.d.ts`) to help you get started.

## Tasks

The `tasks` folder contains of tasks provided by the seed (`/tasks/seed`) and project specific tasks (`/tasks/project`). As for the project specific tasks there is a sample provided (`/tasks/project/sample.task.ts`) to help you get started.

The seed provides the following tasks:
* `build.assets.dev.ts`
* `build.assets.prod.ts`
* `build.bundles.app.ts`
* `build.bundles.ts`
* `build.docs.ts`
* `build.html_css.ts`
* `build.index.dev.ts`
* `build.index.prod.ts`
* `build.js.dev.ts`
* `build.js.e2e.ts`
* `build.js.prod.ts`
* `build.js.test.ts`
* `build.js.tools.ts`
* `check.versions.ts`
* `clean.all.ts`
* `clean.dev.ts`
* `copy.js.prod.ts`
* `css-lint.ts`
* `e2e.ts`
* `generate.manifest.ts`
* `karma.start.ts`
* `serve.coverage.ts`
* `serve.docs.ts`
* `serve.prod.ts`
* `serve.start.ts`
* `tslint.ts`
* `watch.dev.ts`
* `watch.e2e.ts`
* `watch.test.ts`
* `webdriver.ts`

## Utilities

The `utils` folder contains of utilities provided by the seed (`/utils/seed`) and project specific utilities (`/utils/project`). As for the project specific utilities there is a sample provided (`/utils/project/sample_util.ts`) to help you get started.

The utilities are exported by the barrel files `project.utils.ts` (for the project specific utilities) and `seed.utils.ts` (for the utilities provided by the seed).

The seed provides the following utilities:
* `clean.ts`
* `code_change_tools.ts`
* `server.ts`
* `task_tools.ts`
* `template_locals.ts`
* `tsproject.ts`
* `watch.ts`