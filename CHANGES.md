## Build updates

[List of todo's](./todos.md) inside the code

__Note:__ this might not be an exhaustive list but will give some insights.
Read the source to see what it really looks like.

* Move `app/typings` to `tools/typings`
* Keep `tsd_typings` into the source to allow earlier ts execution in the install process


* Refactor `utils.ts`
  * split into individual modules in `tools/utils`
  * Add `log`
  * Add `registerTasks` auto-register tasks from `tools/tasks` (`tasks/build.dev.ts` => `gulp  build.dev`)
  * Add `registerInjectableAssetsRef` to reference files to be injected into `index.html`
  * TODO: Add methods to extend `templateLocals`
  * TODO: Address `clean`, `watch` tasks (special API ?)


* Refactor `gulpfile.ts`
  * ON-GOING: Keep it for workflow configuration only


* Refactor `workflow.config.ts`
  * Renamed `config.ts`
  * Add static `VERSION`,
  * Add `cwd`
  * TODO: make gulp & plugins available globally


* CLI Configuration
  * Add `-- debug`
  * Add `-- env`
  * TODO: Add `-h --help`
  * TODO: Finalize refactoring of `env` usage


* npm scripts
  * Add access to `tsd`, `gulp`, `karma` (pass argv: `npm run karma -- start`)


* Install process
  * TODO: Add `npm install -- --blank` to remove any examples


* Doc
  TODO: Add proper documentation on how to extend


* Showcase (to be removed if ported to angular2-seed)
  * Add `bootstrap.css` from npm
  * Add bootstrap `fonts`


* App boilerplate
  * TODO: Improve `bootstrap`
  * TODO: Move `app` to `components/app` ??


----

# Notes

* typings
  * No need to install typings
  * Move `app/typings` to `tools`
  * Move `tsd_typings` to `tools`
  * TODO: Open issue #xxx about `app/typings.d.ts`


* app
  * Move `AppCmp` to `app/components/app`
  * Add `bootstrap.ts`
  * Move `init.ts` to `index.html`
  * Rename all components class name by `{cmpname}Cmp`


* config
 *


* utils
  * Modularize
  * Add asset injection method `registerInjectableAssetsRef`
  * Add task tools - exports `autoRegisterTasks` & `task`


* tasks
  * Modularize
  * tasks available by default:
    * build.css.dev
    * build.dev
    * build.dev.watch
    * build.fonts
    * build.index.dev
    * build.js.dev
    * build.lib.dev
    * build.sass.dev
    * build.test
    * build.test.watch
    * clean
    * clean.dist
    * clean.test
    * karma.start
    * npm
    * postinstall
    * serve
    * server.start
    * test
    * tsd
    * tslint
    * watch.dev
    * watch.serve
    * watch.test


* build & install
