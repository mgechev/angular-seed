# Introduction

[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/guide/styleguide)
[![Build Status](https://travis-ci.org/mgechev/angular-seed.svg?branch=master)](https://travis-ci.org/mgechev/angular-seed)
[![Build Status](https://ci.appveyor.com/api/projects/status/jg5vg36w0klpa00e/branch/master?svg=true)](https://ci.appveyor.com/project/mgechev/angular2-seed)
[![Join the chat at https://gitter.im/mgechev/angular2-seed](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angular2-seed?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Greenkeeper badge](https://badges.greenkeeper.io/mgechev/angular-seed.svg)](https://greenkeeper.io/)
[![Dependency Status](https://david-dm.org/mgechev/angular-seed.svg)](https://david-dm.org/mgechev/angular-seed)

Provides fast, reliable and extensible starter for the development of Angular projects.

**Warning: If you're just getting started with the entire JavaScript ecosystem then Angular Seed might not be the best choice for you. The project provides scalable approach for building Angular applications but you may face difficulties configuring this highly customizable solution. In such case we recommend the [Angular CLI](https://github.com/angular/angular-cli).**

`angular-seed` provides the following features:

- Allows you to painlessly update the seed tasks of already existing project.
- Supports multiple Angular applications with shared codebase in a single instance of the seed.
- Official Angular i18n support.
- Ready to go, statically typed build system using gulp for working with TypeScript.
- Production and development builds.
- **Ahead-of-Time** compilation support.
- **Tree-Shaking** production builds with Rollup.
- Uses codelyzer for static code analysis, which verifies that the project follows practices from the Angular style guide.
- Sample unit tests with Jasmine and Karma including code coverage via [istanbul](https://gotwarlost.github.io/istanbul/).
- End-to-end tests with Cypress.
- Development server with Livereload.
- Following the [best practices](https://angular.io/guide/styleguide).
- Provides full Docker support for both development and production environment
- Support for Angular Mobile Toolkit
- Allows you to analyze the space usage of created bundles by using source-map-explorer

# How to start

**Note** that this seed project requires node >=v6.9.0 or higher and npm >=3.10.3 but in order to be able to take advantage of the complete functionality we **strongly recommend node >=v8.x.x and npm >=5.x.x**.

In order to start the seed use:


```bash
$ git clone --depth 1 https://github.com/mgechev/angular-seed.git
$ cd angular-seed

# install the project's dependencies
$ npm install
# fast install (via Yarn, https://yarnpkg.com)
$ yarn install  # or yarn

# watches your files and uses livereload by default
$ npm start

# generate api documentation
$ npm run compodoc
$ npm run serve.compodoc


# to start deving with livereload site and coverage as well as continuous testing
$ npm run start.deving

# dev build
$ npm run build.dev
# prod build, will output the production application in `dist/prod`
# the produced code can be deployed (rsynced) to a remote server
$ npm run build.prod
# prod build using different base path
$ npm run build.prod -- --base "/foo/bar/"

# dev build of multiple applications (by default the value of --app is "app")
$ npm start -- --app baz
$ npm start -- --app foo
$ npm start -- --app bar
```
_Does not rely on any global dependencies._

**Notes**
- Beware of non-static/side-effectful imports. These cannot be properly optimized. For this reason, even though tree-shaking is taking place the developer still needs to be careful not to include non-static imports that are unnecessary, as those referenced imports will always end up in final bundle. Special attention should be given to RxJs, which makes heavy use of non-static/side-effectful imports: make sure you only [pipeable operators](https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md).
- UMD modules result in code that cannot be properly optimized. For best results, prefer ES6 modules whenever possible. This includes third-party dependencies: if one is published in both UMD and ES6 modules, go with the ES6 modules version.
- During a production build, CommonJs modules will be automatically converted to ES6 modules. This means you can use them and/or require dependencies that use them without any issues.

# Internationalization

Put `i18n` attribute to your html tag to mark it for translation, more information here: https://angular.io/docs/ts/latest/cookbook/i18n.html

## Create a translation source file

```bash
# Your translation file will be generated here `dist/locale`
$ npm run i18n
```

## Production build with your language

```bash
# Build prod app with the language file `dist/locale/messages.en.xlf`
$ npm run build.prod -- --lang en
```

# Dockerization

The application provides full Docker support. You can use it for both development and production builds and deployments.

Please note that prod and dev are built into their own separate image, which can lead to unexpected differences in the
npm dependencies and the state of the sources in the container, if you are not familiar with Docker. See below.

Please also note that karma tests (`npm test`) are independent from the docker environment.
Even if an angular-seed container is up and running, karma will run in the context of your **local** npm install,
which may differ from that of the container. In fact, the docker containers don't have karma installed at all.

Cypress tests are however fully supported and recommended to test the app served by either the dev or prod docker containers.  

## Development build and deployment

The dev image only contains the npm libraries installed, but not the sources. The sources are mounted at runtime,
via a docker shared volume, which allows for the live-reload feature to work.
 
To start the container, use:

```bash
$ docker-compose -f docker-compose.dev.yml up -d   # optional: --build, see below
```

Now open your browser at http://localhost:5555

## Production build and deployment

The prod image serves the minified app (sources compiles with a minimal set of dependencies), via an Nginx server.
It is self-contained, and can therefore be pushed to a Docker registry to be deployed somewhere else easily.

To start the container, use:

```bash
$ docker-compose -f docker-compose.prod.yml up -d   # optional: --build, see below
```

Now open your browser at http://localhost:5555

## Updating dependencies and sources
If you are not already familiar with Docker, please note that for both Dev and Prod docker environments, updates to
npm dependencies will be visible only after re-building the image and restarting a new container from it.

In Dev environment, this only applies to npm dependencies, since the sources are mounted as a shared directory.
In Prod environment, this applies to any change in the project.

To force docker-compose to rebuild the image before starting the container, use the --build flag:

```bash
$ docker-compose -f docker-compose.dev.yml up -d --build
```


# Analyzing the space usage of the app
You can analyze the bundle with [source-map-explorer](https://github.com/danvk/source-map-explorer).
It creates a html chart with a file by default, but output can also be json or tsv.

Run the following:
```bash
$ npm run sme.prod
# You can specify the output format by passing the `sme-out-format` parameter
$ npm run sme.prod -- --sme-out-format json # or html / tsv
```

# Table of Contents

- [Introduction](#introduction)
- [How to start](#how-to-start)
- [Dockerization](#dockerization)
  + [How to build and start the dockerized version of the application](#how-to-build-and-start-the-dockerized-version-of-the-application)
  + [Development build and deployment](#development-build-and-deployment)
  + [Production build and deployment](#production-build-and-deployment)
- [Analyzing the space usage of the app](#analyzing-the-space-usage-of-the-app)
- [Table of Content](#table-of-content)
- [Configuration](#configuration)
- [Environment Configuration](#environment-configuration)
- [Tools documentation](#tools-documentation)
- [How to extend?](#how-to-extend)
- [Running tests](#running-tests)
- [Contributing](#contributing)
- [Advanced Seed Option](#advanced-seed-option)
- [Examples](#examples)
- [Directory Structure](#directory-structure)
- [Contributors](#contributors)
  - [Wiki Contributors](#wiki-contributors)
- [Change Log](#change-log)
- [License](#license)

# Configuration

Default application server configuration

```js
const PORT             = 5555;
const DOCS_PORT        = 4003;
const APP_BASE         = '/';
```

Configure at runtime

```bash
$ npm start -- --port 8080 --base /my-app/
```

## Environment configuration

If you have different environments and you need to configure them to use different end points, settings, etc. you can use the files `dev.ts` or `prod.ts` in`./tools/env/`. The name of the file is environment you want to use.

The environment can be specified by using:

```bash
$ npm start -- --env-config ENV_NAME
```

Currently the `ENV_NAME`s are `dev`, `prod`, `staging`, but you can simply add a different file `"ENV_NAME.ts".` file in order to alter extra such environments.

# Tools documentation

A documentation of the provided tools can be found in [tools/README.md](tools/README.md).

# How to extend?

Visit the [Wiki page](https://github.com/mgechev/angular-seed/wiki) of the project.

# How to update?
```
git remote add upstream https://github.com/mgechev/angular-seed
git pull upstream master
```

# Running tests

```bash
$ npm test

# Development. Your app will be watched by karma
# on each change all your specs will be executed.
$ npm run test.watch
# NB: The command above might fail with a "EMFILE: too many open files" error.
# Some OS have a small limit of opened file descriptors (256) by default
# and will result in the EMFILE error.
# You can raise the maximum of file descriptors by running the command below:
$ ulimit -n 10480


# code coverage (istanbul)
# auto-generated at the end of `npm test`
# view coverage report:
$ npm run serve.coverage

# e2e (aka. end-to-end, integration)  - In two different shell windows
$ npm start
$ npm run e2e

# e2e - In one shell window (especially useful for Continuous Integration)
$ npm run e2e.ci

# e2e live mode - Using Cypress app - In two different shell windows
$ npm start
$ npm run e2e.live
```

# Contributing

Please see the [CONTRIBUTING](https://github.com/mgechev/angular-seed/blob/master/.github/CONTRIBUTING.md) file for guidelines.

# Advanced Seed Option

An [advanced option to this seed exists here](https://github.com/NathanWalker/angular-seed-advanced) which shows examples of how this seed can be expanded to support:

- [ngrx/store](https://github.com/ngrx/store) RxJS powered state management, inspired by **Redux**
- [ngrx/effects](https://github.com/ngrx/effects) Side effect model for @ngrx/store
- [ngx-translate](https://github.com/ngx-translate/core) for i18n
  - Usage is optional but on by default
  - Up to you and your team how you want to utilize it. It can be easily removed if not needed.
- [angulartics2](https://github.com/angulartics/angulartics2) Vendor-agnostic analytics for Angular applications.
  - Out of box support for [Segment](https://segment.com/)
    - When using the seed, be sure to change your `write_key` [here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/index.html#L24)
  - Can be changed to any vendor, [learn more here](https://github.com/angulartics/angulartics2#supported-providers)
- [lodash](https://lodash.com/) Helps reduce blocks of code down to single lines and enhances readability
- [NativeScript](https://www.nativescript.org/) cross platform mobile (w/ native UI) apps.
- [Electron](http://electron.atom.io/) cross platform desktop apps (Mac, Windows and Linux).

You may use it to learn how to extend this seed for your own use cases.

# Examples

Forks of this project demonstrate how to extend and integrate with other libraries:

 - https://github.com/mgechev/switching-to-angular2 - code samples for the book ["Switching to Angular 2"](https://www.packtpub.com/web-development/switching-angular-2).
 - https://github.com/DeviantJS/angular2-seed-postcss - Extending PostCSS with precss / cssnext for Sass-like features.
 - https://github.com/AngularShowcase/angular2-sample-app - sample Angular application.
 - https://github.com/AngularShowcase/ng2-bootstrap-sbadmin - ng2-bootstrap-sbadmin.
 - https://github.com/AngularShowcase/angular2-seed-ng2-highcharts - Simple application including a [Highcharts](http://www.highcharts.com) graph.
 - https://github.com/tarlepp/angular-sailsjs-boilerplate-frontend-angular2 - Example application for [Sails.js](http://sailsjs.org/) integration.
 - https://github.com/ludohenin/ng2-wp-blog - Angular application using Wordpress [JSON-API](http://v2.wp-api.org) backend..
 - https://github.com/AngularShowcase/angular2-seed-example-mashup - Angular application demonstrating the use of [Redux](http://redux.js.org/), [D3](https://github.com/mbostock/d3), [socket io](https://github.com/socketio), [Google Charts](https://developers.google.com/chart/), and [RxJs](https://github.com/Reactive-Extensions/RxJS).
 - https://github.com/tiagomapmarques/angular2-seed-phaser/tree/releases - integration with [Phaser](http://phaser.io/).
 - https://github.com/vyakymenko/angular-seed-express - integration with [Express](https://expressjs.com/) full-stack development.
 - https://github.com/UIUXEngineering/angular2-jspm-typescript-seed - integration with [JSPM](http://jspm.io/).
 - http://ngbot.io - a chat bot built with angular-seed.
 - [angular-seed-inspinia](https://github.com/DmitriyPotapov/angular-seed-inspinia) - integration with custom design template
 - [telerik/kendo-angular-quickstart-seed](https://github.com/telerik/kendo-angular-quickstart-seed) - integration with Kendo UI for Angular
 - https://github.com/vyakymenko/angular-lib-starter-pack - sample how to create your library compatible with [Angular Seed](https://github.com/mgechev/angular-seed) with [integration guide](https://github.com/vyakymenko/angular-lib-starter-pack#test-your-library-with-angular-seed-or-angular-seed-express).

# Directory Structure

```
.
├── .docker
│   ├── dist-build.development.dockerfile  <- Dockerfile for development environment
│   └── dist-build.production.dockerfile   <- Dockerfile for production environment
├── .dockerignore              <- ignore file for the docker builds
├── LICENSE
├── README.md
├── appveyor.yml
├── docker-compose.production.yml  <- docker-compose file for production environment
├── docker-compose.yml.        <- docker-compose file for development environment
├── gulpfile.ts                <- configuration of the gulp tasks
├── karma.conf.js              <- configuration of the test runner
├── package.json               <- dependencies of the project
├── cypress
|   ├── fixtures
|   |   └── example.json
|   ├── integration
|   |   ├── about.component.e2e-spec.ts
|   |   ├── app.component.e2e-spec.ts
|   |   └── home.component.e2e-spec.ts
|   ├── plugins
|   |   ├── cy-ts-preprocessor.js
|   |   └── index.js
|   ├── support
|   |   ├── commands.js
|   |   └── index.js
|   └── tsconfig.json
├── src
│   ├── client
│   │   ├── app
│   │   │   ├── about
│   │   │   │   ├── about-routing.module.ts
│   │   │   │   ├── about.component.css
│   │   │   │   ├── about.component.html
│   │   │   │   ├── about.component.spec.ts
│   │   │   │   ├── about.component.ts
│   │   │   │   └── about.module.ts
│   │   │   ├── app-routing.module.ts
│   │   │   ├── app.component.css
│   │   │   ├── app.component.html
│   │   │   ├── app.component.spec.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.module.ts
│   │   │   ├── home
│   │   │   │   ├── home-routing.module.ts
│   │   │   │   ├── home.component.css
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.spec.ts
│   │   │   │   ├── home.component.ts
│   │   │   │   └── home.module.ts
│   │   │   ├── i18n.providers.ts
│   │   │   ├── main-prod.ts
│   │   │   ├── main.ts
│   │   │   └── shared
│   │   │       ├── config
│   │   │       │   └── env.config.ts
│   │   │       ├── name-list
│   │   │       │   ├── name-list.service.spec.ts
│   │   │       │   └── name-list.service.ts
│   │   │       ├── navbar
│   │   │       │   ├── navbar.component.css
│   │   │       │   ├── navbar.component.html
│   │   │       │   └── navbar.component.ts
│   │   │       ├── shared.module.ts
│   │   │       └── toolbar
│   │   │           ├── toolbar.component.css
│   │   │           ├── toolbar.component.html
│   │   │           └── toolbar.component.ts
│   │   ├── assets
│   │   │   ├── data.json
│   │   │   ├── favicon
│   │   │   │   ├── favicon-DEV.ico
│   │   │   │   └── favicon-PROD.ico
│   │   │   └── svg
│   │   │       └── more.svg
│   │   ├── css
│   │   │   └── main.css
│   │   ├── index.html
│   │   ├── ngsw-config.json
│   │   ├── system-config.ts
│   │   └── tsconfig.json
├── test-config.js             <- testing configuration
├── test-main.js               <- karma test launcher
├── tools
│   ├── README.md              <- build documentation
│   ├── config
│   │   ├── banner-256.txt
│   │   ├── banner.txt
│   │   ├── project.config.ts  <- configuration of the specific project
│   │   ├── project.tasks.json <- override composite gulp tasks
│   │   ├── seed.config.ts     <- generic configuration of the seed project
│   │   ├── seed.config.interfaces.ts
│   │   ├── seed.tasks.json    <- default composite gulp tasks
│   │   └── seed.tslint.json   <- generic tslint configuration of the seed project
│   ├── config.ts              <- exported configuration (merge both seed.config and project.config, project.config overrides seed.config)
│   ├── debug.ts
│   ├── env                    <- environment configuration
│   │   ├── base.ts
│   │   ├── dev.ts
│   │   ├── env-config.interface.ts
│   │   └── prod.ts
│   ├── manual_typings
│   │   ├── project            <- manual ambient typings for the project
│   │   │   └── sample.package.d.ts
│   │   └── seed               <- seed manual ambient typings
│   │       ├── autoprefixer.d.ts
│   │       ├── cssnano.d.ts
│   │       ├── express-history-api-fallback.d.ts
│   │       ├── istream.d.ts
│   │       ├── karma.d.ts
│   │       ├── merge-stream.d.ts
│   │       ├── open.d.ts
│   │       ├── slash.d.ts
│   │       ├── systemjs-builder.d.ts
│   │       └── tildify.d.ts
│   ├── tasks                  <- gulp tasks
│   │   ├── assets_task.ts
│   │   ├── css_task.ts
│   │   ├── project            <- project specific gulp tasks
│   │   │   └── sample.task.ts
│   │   └── seed               <- seed generic gulp tasks. They can be overriden by the project specific gulp tasks
│   │   │   ├── build.assets.dev.ts
│   │   │   ├── build.assets.prod.ts
│   │   │   ├── build.bundles.app.rollup.aot.ts
│   │   │   ├── build.bundles.ts
│   │   │   ├── build.docs.ts
│   │   │   ├── build.html_css.ts
│   │   │   ├── build.index.dev.ts
│   │   │   ├── build.index.prod.ts
│   │   │   ├── build.js.dev.ts
│   │   │   ├── build.js.prod.rollup.aot.ts
│   │   │   ├── build.js.test.ts
│   │   │   ├── build.sme.prod.aot.ts
│   │   │   ├── build.sme.prod.rollup.aot.ts
│   │   │   ├── build.sme.prod.ts
│   │   │   ├── build.tools.ts
│   │   │   ├── check.tools.ts
│   │   │   ├── check.versions.ts
│   │   │   ├── clean.all.ts
│   │   │   ├── clean.coverage.ts
│   │   │   ├── clean.dev.ts
│   │   │   ├── clean.prod.ts
│   │   │   ├── clean.sme.ts
│   │   │   ├── clean.tools.ts
│   │   │   ├── clear.files.ts
│   │   │   ├── compile.ahead.prod.ts
│   │   │   ├── copy.prod.rollup.aot.ts
│   │   │   ├── copy.prod.ts
│   │   │   ├── e2e.ts
│   │   │   ├── generate.manifest.ts
│   │   │   ├── i18n.build.ts
│   │   │   ├── i18n.merge.ts
│   │   │   ├── karma.run.ts
│   │   │   ├── karma.run.with_coverage.ts
│   │   │   ├── karma.run.without_coverage.ts
│   │   │   ├── karma.watch.ts
│   │   │   ├── minify.bundles.ts
│   │   │   ├── minify.index.ts
│   │   │   ├── noop.ts
│   │   │   ├── print.banner.ts
│   │   │   ├── serve.coverage.ts
│   │   │   ├── serve.coverage.watch.ts
│   │   │   ├── serve.docs.ts
│   │   │   ├── server.prod.ts
│   │   │   ├── server.start.ts
│   │   │   ├── start.deving.ts
│   │   │   ├── sw.manifest.static.ts
│   │   │   ├── test.watch.ts
│   │   │   ├── transpile.bundles.rollup.aot.ts
│   │   │   ├── tslint.ts
│   │   │   ├── watch.dev.ts
│   │   │   └── watch.test.ts
│   │   ├── task.ts
│   │   └── typescript_task.ts
│   ├── utils                  <- build utils
│   │   ├── project            <- project specific gulp utils
│   │   │   └── sample_util.ts
│   │   ├── project.utils.ts
│   │   ├── seed               <- seed specific gulp utils
│   │   │   ├── build_optimizer.ts
│   │   │   ├── clean.ts
│   │   │   ├── code_change_tools.ts
│   │   │   ├── karma.start.ts
│   │   │   ├── server.ts
│   │   │   ├── sme.ts
│   │   │   ├── tasks_tools.ts
│   │   │   ├── template_locals.ts
│   │   │   ├── tsproject.ts
│   │   │   └── watch.ts
│   │   └── seed.utils.ts
│   └── utils.ts
├── tsconfig.json              <- configuration of the typescript project (ts-node, which runs the tasks defined in gulpfile.ts)
├── tslint.json                <- tslint configuration
└── yarn.lock
```

# Contributors

[<img alt="mgechev" src="https://avatars1.githubusercontent.com/u/455023?v=4&s=117" width="117">](https://github.com/mgechev) |[<img alt="ludohenin" src="https://avatars0.githubusercontent.com/u/1011516?v=4&s=117" width="117">](https://github.com/ludohenin) |[<img alt="greenkeeper[bot]" src="https://avatars3.githubusercontent.com/in/505?v=4&s=117" width="117">](https://github.com/apps/greenkeeper) |[<img alt="d3viant0ne" src="https://avatars1.githubusercontent.com/u/8420490?v=4&s=117" width="117">](https://github.com/d3viant0ne) |[<img alt="Shyam-Chen" src="https://avatars1.githubusercontent.com/u/13535256?v=4&s=117" width="117">](https://github.com/Shyam-Chen) |[<img alt="vyakymenko" src="https://avatars1.githubusercontent.com/u/7300673?v=4&s=117" width="117">](https://github.com/vyakymenko) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[ludohenin](https://github.com/ludohenin) |[greenkeeper[bot]](https://github.com/apps/greenkeeper) |[d3viant0ne](https://github.com/d3viant0ne) |[Shyam-Chen](https://github.com/Shyam-Chen) |[vyakymenko](https://github.com/vyakymenko) |

[<img alt="karlhaas" src="https://avatars2.githubusercontent.com/u/7677394?v=4&s=117" width="117">](https://github.com/karlhaas) |[<img alt="tarlepp" src="https://avatars2.githubusercontent.com/u/595561?v=4&s=117" width="117">](https://github.com/tarlepp) |[<img alt="Nightapes" src="https://avatars1.githubusercontent.com/u/15911153?v=4&s=117" width="117">](https://github.com/Nightapes) |[<img alt="robstoll" src="https://avatars1.githubusercontent.com/u/5557885?v=4&s=117" width="117">](https://github.com/robstoll) |[<img alt="TheDonDope" src="https://avatars2.githubusercontent.com/u/1188033?v=4&s=117" width="117">](https://github.com/TheDonDope) |[<img alt="NathanWalker" src="https://avatars2.githubusercontent.com/u/457187?v=4&s=117" width="117">](https://github.com/NathanWalker) |
:---: |:---: |:---: |:---: |:---: |:---: |
[karlhaas](https://github.com/karlhaas) |[tarlepp](https://github.com/tarlepp) |[Nightapes](https://github.com/Nightapes) |[robstoll](https://github.com/robstoll) |[TheDonDope](https://github.com/TheDonDope) |[NathanWalker](https://github.com/NathanWalker) |

[<img alt="hankehly" src="https://avatars3.githubusercontent.com/u/11639738?v=4&s=117" width="117">](https://github.com/hankehly) |[<img alt="salemdar" src="https://avatars1.githubusercontent.com/u/6159613?v=4&s=117" width="117">](https://github.com/salemdar) |[<img alt="nareshbhatia" src="https://avatars1.githubusercontent.com/u/1220198?v=4&s=117" width="117">](https://github.com/nareshbhatia) |[<img alt="kiuka" src="https://avatars1.githubusercontent.com/u/11283191?v=4&s=117" width="117">](https://github.com/kiuka) |[<img alt="fr-esco" src="https://avatars1.githubusercontent.com/u/4931297?v=4&s=117" width="117">](https://github.com/fr-esco) |[<img alt="jesperronn" src="https://avatars2.githubusercontent.com/u/6267?v=4&s=117" width="117">](https://github.com/jesperronn) |
:---: |:---: |:---: |:---: |:---: |:---: |
[hankehly](https://github.com/hankehly) |[salemdar](https://github.com/salemdar) |[nareshbhatia](https://github.com/nareshbhatia) |[kiuka](https://github.com/kiuka) |[fr-esco](https://github.com/fr-esco) |[jesperronn](https://github.com/jesperronn) |

[<img alt="daniru" src="https://avatars3.githubusercontent.com/u/2070853?v=4&s=117" width="117">](https://github.com/daniru) |[<img alt="patrickmichalina" src="https://avatars3.githubusercontent.com/u/6701211?v=4&s=117" width="117">](https://github.com/patrickmichalina) |[<img alt="ArnaudPel" src="https://avatars3.githubusercontent.com/u/6020369?v=4&s=117" width="117">](https://github.com/ArnaudPel) |[<img alt="nhutcorp" src="https://avatars3.githubusercontent.com/u/259458?v=4&s=117" width="117">](https://github.com/nhutcorp) |[<img alt="netstart" src="https://avatars1.githubusercontent.com/u/200232?v=4&s=117" width="117">](https://github.com/netstart) |[<img alt="sasikumardr" src="https://avatars0.githubusercontent.com/u/1760104?v=4&s=117" width="117">](https://github.com/sasikumardr) |
:---: |:---: |:---: |:---: |:---: |:---: |
[daniru](https://github.com/daniru) |[patrickmichalina](https://github.com/patrickmichalina) |[ArnaudPel](https://github.com/ArnaudPel) |[nhutcorp](https://github.com/nhutcorp) |[netstart](https://github.com/netstart) |[sasikumardr](https://github.com/sasikumardr) |

[<img alt="aboeglin" src="https://avatars0.githubusercontent.com/u/8297302?v=4&s=117" width="117">](https://github.com/aboeglin) |[<img alt="eppsilon" src="https://avatars1.githubusercontent.com/u/5643?v=4&s=117" width="117">](https://github.com/eppsilon) |[<img alt="ashishmondal" src="https://avatars0.githubusercontent.com/u/2115712?v=4&s=117" width="117">](https://github.com/ashishmondal) |[<img alt="sfabriece" src="https://avatars2.githubusercontent.com/u/3108592?v=4&s=117" width="117">](https://github.com/sfabriece) |[<img alt="gkalpak" src="https://avatars2.githubusercontent.com/u/8604205?v=4&s=117" width="117">](https://github.com/gkalpak) |[<img alt="ryzy" src="https://avatars1.githubusercontent.com/u/994940?v=4&s=117" width="117">](https://github.com/ryzy) |
:---: |:---: |:---: |:---: |:---: |:---: |
[aboeglin](https://github.com/aboeglin) |[eppsilon](https://github.com/eppsilon) |[ashishmondal](https://github.com/ashishmondal) |[sfabriece](https://github.com/sfabriece) |[gkalpak](https://github.com/gkalpak) |[ryzy](https://github.com/ryzy) |

[<img alt="markwhitfeld" src="https://avatars0.githubusercontent.com/u/1948265?v=4&s=117" width="117">](https://github.com/markwhitfeld) |[<img alt="Karasuni" src="https://avatars1.githubusercontent.com/u/15806406?v=4&s=117" width="117">](https://github.com/Karasuni) |[<img alt="nosachamos" src="https://avatars1.githubusercontent.com/u/1261686?v=4&s=117" width="117">](https://github.com/nosachamos) |[<img alt="jerryorta-dev" src="https://avatars1.githubusercontent.com/u/341155?v=4&s=117" width="117">](https://github.com/jerryorta-dev) |[<img alt="pgrzeszczak" src="https://avatars0.githubusercontent.com/u/3300099?v=4&s=117" width="117">](https://github.com/pgrzeszczak) |[<img alt="treyrich" src="https://avatars0.githubusercontent.com/u/1641028?v=4&s=117" width="117">](https://github.com/treyrich) |
:---: |:---: |:---: |:---: |:---: |:---: |
[markwhitfeld](https://github.com/markwhitfeld) |[Karasuni](https://github.com/Karasuni) |[nosachamos](https://github.com/nosachamos) |[jerryorta-dev](https://github.com/jerryorta-dev) |[pgrzeszczak](https://github.com/pgrzeszczak) |[treyrich](https://github.com/treyrich) |

[<img alt="natarajanmca11" src="https://avatars2.githubusercontent.com/u/9244766?v=4&s=117" width="117">](https://github.com/natarajanmca11) |[<img alt="e-oz" src="https://avatars0.githubusercontent.com/u/526352?v=4&s=117" width="117">](https://github.com/e-oz) |[<img alt="troyanskiy" src="https://avatars1.githubusercontent.com/u/1538862?v=4&s=117" width="117">](https://github.com/troyanskiy) |[<img alt="admosity" src="https://avatars2.githubusercontent.com/u/4655972?v=4&s=117" width="117">](https://github.com/admosity) |[<img alt="alllx" src="https://avatars1.githubusercontent.com/u/701295?v=4&s=117" width="117">](https://github.com/alllx) |[<img alt="ArminZol" src="https://avatars3.githubusercontent.com/u/13023939?v=4&s=117" width="117">](https://github.com/ArminZol) |
:---: |:---: |:---: |:---: |:---: |:---: |
[natarajanmca11](https://github.com/natarajanmca11) |[e-oz](https://github.com/e-oz) |[troyanskiy](https://github.com/troyanskiy) |[admosity](https://github.com/admosity) |[alllx](https://github.com/alllx) |[ArminZol](https://github.com/ArminZol) |

[<img alt="LuxDie" src="https://avatars2.githubusercontent.com/u/12536671?v=4&s=117" width="117">](https://github.com/LuxDie) |[<img alt="JakePartusch" src="https://avatars0.githubusercontent.com/u/6424140?v=4&s=117" width="117">](https://github.com/JakePartusch) |[<img alt="JayKan" src="https://avatars0.githubusercontent.com/u/1400300?v=4&s=117" width="117">](https://github.com/JayKan) |[<img alt="JohnCashmore" src="https://avatars3.githubusercontent.com/u/2050794?v=4&s=117" width="117">](https://github.com/JohnCashmore) |[<img alt="larsthorup" src="https://avatars2.githubusercontent.com/u/1202959?v=4&s=117" width="117">](https://github.com/larsthorup) |[<img alt="ouq77" src="https://avatars2.githubusercontent.com/u/1796191?v=4&s=117" width="117">](https://github.com/ouq77) |
:---: |:---: |:---: |:---: |:---: |:---: |
[LuxDie](https://github.com/LuxDie) |[JakePartusch](https://github.com/JakePartusch) |[JayKan](https://github.com/JayKan) |[JohnCashmore](https://github.com/JohnCashmore) |[larsthorup](https://github.com/larsthorup) |[ouq77](https://github.com/ouq77) |

[<img alt="Doehl" src="https://avatars0.githubusercontent.com/u/1913751?v=4&s=117" width="117">](https://github.com/Doehl) |[<img alt="RomaDotDev" src="https://avatars0.githubusercontent.com/u/1380457?v=4&s=117" width="117">](https://github.com/RomaDotDev) |[<img alt="StefanKoenen" src="https://avatars3.githubusercontent.com/u/1442819?v=4&s=117" width="117">](https://github.com/StefanKoenen) |[<img alt="amedinavalencia" src="https://avatars0.githubusercontent.com/u/21317797?v=4&s=117" width="117">](https://github.com/amedinavalencia) |[<img alt="odk211" src="https://avatars3.githubusercontent.com/u/1321120?v=4&s=117" width="117">](https://github.com/odk211) |[<img alt="tsm91" src="https://avatars3.githubusercontent.com/u/4459551?v=4&s=117" width="117">](https://github.com/tsm91) |
:---: |:---: |:---: |:---: |:---: |:---: |
[Doehl](https://github.com/Doehl) |[RomaDotDev](https://github.com/RomaDotDev) |[StefanKoenen](https://github.com/StefanKoenen) |[amedinavalencia](https://github.com/amedinavalencia) |[odk211](https://github.com/odk211) |[tsm91](https://github.com/tsm91) |

[<img alt="domfarolino" src="https://avatars1.githubusercontent.com/u/9669289?v=4&s=117" width="117">](https://github.com/domfarolino) |[<img alt="juristr" src="https://avatars3.githubusercontent.com/u/542458?v=4&s=117" width="117">](https://github.com/juristr) |[<img alt="jvitor83" src="https://avatars2.githubusercontent.com/u/3493339?v=4&s=117" width="117">](https://github.com/jvitor83) |[<img alt="ahmadqarshi" src="https://avatars1.githubusercontent.com/u/5607132?v=4&s=117" width="117">](https://github.com/ahmadqarshi) |[<img alt="turbohappy" src="https://avatars1.githubusercontent.com/u/437299?v=4&s=117" width="117">](https://github.com/turbohappy) |[<img alt="gotenxds" src="https://avatars2.githubusercontent.com/u/3519520?v=4&s=117" width="117">](https://github.com/gotenxds) |
:---: |:---: |:---: |:---: |:---: |:---: |
[domfarolino](https://github.com/domfarolino) |[juristr](https://github.com/juristr) |[jvitor83](https://github.com/jvitor83) |[ahmadqarshi](https://github.com/ahmadqarshi) |[turbohappy](https://github.com/turbohappy) |[gotenxds](https://github.com/gotenxds) |

[<img alt="devanp92" src="https://avatars2.githubusercontent.com/u/4533277?v=4&s=117" width="117">](https://github.com/devanp92) |[<img alt="DmitriyPotapov" src="https://avatars0.githubusercontent.com/u/5184083?v=4&s=117" width="117">](https://github.com/DmitriyPotapov) |[<img alt="fisenkodv" src="https://avatars0.githubusercontent.com/u/1039447?v=4&s=117" width="117">](https://github.com/fisenkodv) |[<img alt="emilio-simoes" src="https://avatars3.githubusercontent.com/u/1752519?v=4&s=117" width="117">](https://github.com/emilio-simoes) |[<img alt="evanplaice" src="https://avatars1.githubusercontent.com/u/303159?v=4&s=117" width="117">](https://github.com/evanplaice) |[<img alt="JunaidZA" src="https://avatars3.githubusercontent.com/u/16782593?v=4&s=117" width="117">](https://github.com/JunaidZA) |
:---: |:---: |:---: |:---: |:---: |:---: |
[devanp92](https://github.com/devanp92) |[DmitriyPotapov](https://github.com/DmitriyPotapov) |[fisenkodv](https://github.com/fisenkodv) |[emilio-simoes](https://github.com/emilio-simoes) |[evanplaice](https://github.com/evanplaice) |[JunaidZA](https://github.com/JunaidZA) |

[<img alt="c-ice" src="https://avatars3.githubusercontent.com/u/347238?v=4&s=117" width="117">](https://github.com/c-ice) |[<img alt="markharding" src="https://avatars3.githubusercontent.com/u/851436?v=4&s=117" width="117">](https://github.com/markharding) |[<img alt="maxmarkus" src="https://avatars1.githubusercontent.com/u/1720843?v=4&s=117" width="117">](https://github.com/maxmarkus) |[<img alt="ojacquemart" src="https://avatars1.githubusercontent.com/u/1189345?v=4&s=117" width="117">](https://github.com/ojacquemart) |[<img alt="rafaelss95" src="https://avatars0.githubusercontent.com/u/11965907?v=4&s=117" width="117">](https://github.com/rafaelss95) |[<img alt="rajeev-tripathi" src="https://avatars3.githubusercontent.com/u/12512503?v=4&s=117" width="117">](https://github.com/rajeev-tripathi) |
:---: |:---: |:---: |:---: |:---: |:---: |
[c-ice](https://github.com/c-ice) |[markharding](https://github.com/markharding) |[maxmarkus](https://github.com/maxmarkus) |[ojacquemart](https://github.com/ojacquemart) |[rafaelss95](https://github.com/rafaelss95) |[rajeev-tripathi](https://github.com/rajeev-tripathi) |

[<img alt="TuiKiken" src="https://avatars1.githubusercontent.com/u/959821?v=4&s=117" width="117">](https://github.com/TuiKiken) |[<img alt="vogloblinsky" src="https://avatars3.githubusercontent.com/u/2841805?v=4&s=117" width="117">](https://github.com/vogloblinsky) |[<img alt="edud69" src="https://avatars2.githubusercontent.com/u/1514745?v=4&s=117" width="117">](https://github.com/edud69) |[<img alt="idready" src="https://avatars1.githubusercontent.com/u/4941311?v=4&s=117" width="117">](https://github.com/idready) |[<img alt="zbarbuto" src="https://avatars3.githubusercontent.com/u/9100419?v=4&s=117" width="117">](https://github.com/zbarbuto) |[<img alt="Yonet" src="https://avatars1.githubusercontent.com/u/3523671?v=4&s=117" width="117">](https://github.com/Yonet) |
:---: |:---: |:---: |:---: |:---: |:---: |
[TuiKiken](https://github.com/TuiKiken) |[vogloblinsky](https://github.com/vogloblinsky) |[edud69](https://github.com/edud69) |[idready](https://github.com/idready) |[zbarbuto](https://github.com/zbarbuto) |[Yonet](https://github.com/Yonet) |

[<img alt="Green-Cat" src="https://avatars2.githubusercontent.com/u/3328823?v=4&s=117" width="117">](https://github.com/Green-Cat) |[<img alt="ip512" src="https://avatars0.githubusercontent.com/u/1699735?v=4&s=117" width="117">](https://github.com/ip512) |[<img alt="joshboley" src="https://avatars0.githubusercontent.com/u/5840836?v=4&s=117" width="117">](https://github.com/joshboley) |[<img alt="Marcelh1983" src="https://avatars1.githubusercontent.com/u/3284645?v=4&s=117" width="117">](https://github.com/Marcelh1983) |[<img alt="pbazurin-softheme" src="https://avatars3.githubusercontent.com/u/4518922?v=4&s=117" width="117">](https://github.com/pbazurin-softheme) |[<img alt="Bigous" src="https://avatars1.githubusercontent.com/u/6886560?v=4&s=117" width="117">](https://github.com/Bigous) |
:---: |:---: |:---: |:---: |:---: |:---: |
[Green-Cat](https://github.com/Green-Cat) |[ip512](https://github.com/ip512) |[joshboley](https://github.com/joshboley) |[Marcelh1983](https://github.com/Marcelh1983) |[pbazurin-softheme](https://github.com/pbazurin-softheme) |[Bigous](https://github.com/Bigous) |

[<img alt="aamir1995" src="https://avatars0.githubusercontent.com/u/10736453?v=4&s=117" width="117">](https://github.com/aamir1995) |[<img alt="alexweber" src="https://avatars1.githubusercontent.com/u/14409?v=4&s=117" width="117">](https://github.com/alexweber) |[<img alt="allenhwkim" src="https://avatars1.githubusercontent.com/u/1437734?v=4&s=117" width="117">](https://github.com/allenhwkim) |[<img alt="hellofornow" src="https://avatars3.githubusercontent.com/u/3720413?v=4&s=117" width="117">](https://github.com/hellofornow) |[<img alt="Falinor" src="https://avatars2.githubusercontent.com/u/9626158?v=4&s=117" width="117">](https://github.com/Falinor) |[<img alt="amaltsev" src="https://avatars2.githubusercontent.com/u/2480962?v=4&s=117" width="117">](https://github.com/amaltsev) |
:---: |:---: |:---: |:---: |:---: |:---: |
[aamir1995](https://github.com/aamir1995) |[alexweber](https://github.com/alexweber) |[allenhwkim](https://github.com/allenhwkim) |[hellofornow](https://github.com/hellofornow) |[Falinor](https://github.com/Falinor) |[amaltsev](https://github.com/amaltsev) |

[<img alt="tomlobato" src="https://avatars2.githubusercontent.com/u/1187704?v=4&s=117" width="117">](https://github.com/tomlobato) |[<img alt="taguan" src="https://avatars3.githubusercontent.com/u/1026937?v=4&s=117" width="117">](https://github.com/taguan) |[<img alt="bbarry" src="https://avatars0.githubusercontent.com/u/84951?v=4&s=117" width="117">](https://github.com/bbarry) |[<img alt="bbogdanov" src="https://avatars0.githubusercontent.com/u/15037947?v=4&s=117" width="117">](https://github.com/bbogdanov) |[<img alt="sonicparke" src="https://avatars2.githubusercontent.com/u/1139721?v=4&s=117" width="117">](https://github.com/sonicparke) |[<img alt="brendanbenson" src="https://avatars0.githubusercontent.com/u/866866?v=4&s=117" width="117">](https://github.com/brendanbenson) |
:---: |:---: |:---: |:---: |:---: |:---: |
[tomlobato](https://github.com/tomlobato) |[taguan](https://github.com/taguan) |[bbarry](https://github.com/bbarry) |[bbogdanov](https://github.com/bbogdanov) |[sonicparke](https://github.com/sonicparke) |[brendanbenson](https://github.com/brendanbenson) |

[<img alt="brian428" src="https://avatars3.githubusercontent.com/u/140338?v=4&s=117" width="117">](https://github.com/brian428) |[<img alt="briantopping" src="https://avatars2.githubusercontent.com/u/158115?v=4&s=117" width="117">](https://github.com/briantopping) |[<img alt="ckapilla" src="https://avatars3.githubusercontent.com/u/451875?v=4&s=117" width="117">](https://github.com/ckapilla) |[<img alt="cadriel" src="https://avatars2.githubusercontent.com/u/205520?v=4&s=117" width="117">](https://github.com/cadriel) |[<img alt="Cselt" src="https://avatars0.githubusercontent.com/u/11027521?v=4&s=117" width="117">](https://github.com/Cselt) |[<img alt="dszymczuk" src="https://avatars3.githubusercontent.com/u/539352?v=4&s=117" width="117">](https://github.com/dszymczuk) |
:---: |:---: |:---: |:---: |:---: |:---: |
[brian428](https://github.com/brian428) |[briantopping](https://github.com/briantopping) |[ckapilla](https://github.com/ckapilla) |[cadriel](https://github.com/cadriel) |[Cselt](https://github.com/Cselt) |[dszymczuk](https://github.com/dszymczuk) |

[<img alt="dmurat" src="https://avatars1.githubusercontent.com/u/470930?v=4&s=117" width="117">](https://github.com/dmurat) |[<img alt="peah90" src="https://avatars0.githubusercontent.com/u/4435255?v=4&s=117" width="117">](https://github.com/peah90) |[<img alt="dstockhammer" src="https://avatars1.githubusercontent.com/u/1156637?v=4&s=117" width="117">](https://github.com/dstockhammer) |[<img alt="DaveSkender" src="https://avatars3.githubusercontent.com/u/8432125?v=4&s=117" width="117">](https://github.com/DaveSkender) |[<img alt="dwido" src="https://avatars3.githubusercontent.com/u/154235?v=4&s=117" width="117">](https://github.com/dwido) |[<img alt="kayveedw" src="https://avatars1.githubusercontent.com/u/12914925?v=4&s=117" width="117">](https://github.com/kayveedw) |
:---: |:---: |:---: |:---: |:---: |:---: |
[dmurat](https://github.com/dmurat) |[peah90](https://github.com/peah90) |[dstockhammer](https://github.com/dstockhammer) |[DaveSkender](https://github.com/DaveSkender) |[dwido](https://github.com/dwido) |[kayveedw](https://github.com/kayveedw) |

[<img alt="totev" src="https://avatars3.githubusercontent.com/u/4454638?v=4&s=117" width="117">](https://github.com/totev) |[<img alt="doron-nathan-epstein" src="https://avatars1.githubusercontent.com/u/6659033?v=4&s=117" width="117">](https://github.com/doron-nathan-epstein) |[<img alt="ericdoerheit" src="https://avatars1.githubusercontent.com/u/8611720?v=4&s=117" width="117">](https://github.com/ericdoerheit) |[<img alt="gp187" src="https://avatars0.githubusercontent.com/u/3019963?v=4&s=117" width="117">](https://github.com/gp187) |[<img alt="gsamokovarov" src="https://avatars0.githubusercontent.com/u/604618?v=4&s=117" width="117">](https://github.com/gsamokovarov) |[<img alt="koodikindral" src="https://avatars3.githubusercontent.com/u/6285484?v=4&s=117" width="117">](https://github.com/koodikindral) |
:---: |:---: |:---: |:---: |:---: |:---: |
[totev](https://github.com/totev) |[doron-nathan-epstein](https://github.com/doron-nathan-epstein) |[ericdoerheit](https://github.com/ericdoerheit) |[gp187](https://github.com/gp187) |[gsamokovarov](https://github.com/gsamokovarov) |[koodikindral](https://github.com/koodikindral) |

[<img alt="hkashlan" src="https://avatars2.githubusercontent.com/u/4923194?v=4&s=117" width="117">](https://github.com/hkashlan) |[<img alt="hpinsley" src="https://avatars0.githubusercontent.com/u/750098?v=4&s=117" width="117">](https://github.com/hpinsley) |[<img alt="NN77" src="https://avatars2.githubusercontent.com/u/3319904?v=4&s=117" width="117">](https://github.com/NN77) |[<img alt="isidroamv" src="https://avatars0.githubusercontent.com/u/4197621?v=4&s=117" width="117">](https://github.com/isidroamv) |[<img alt="aelbore" src="https://avatars0.githubusercontent.com/u/18069807?v=4&s=117" width="117">](https://github.com/aelbore) |[<img alt="JohnnyQQQQ" src="https://avatars0.githubusercontent.com/u/3528218?v=4&s=117" width="117">](https://github.com/JohnnyQQQQ) |
:---: |:---: |:---: |:---: |:---: |:---: |
[hkashlan](https://github.com/hkashlan) |[hpinsley](https://github.com/hpinsley) |[NN77](https://github.com/NN77) |[isidroamv](https://github.com/isidroamv) |[aelbore](https://github.com/aelbore) |[JohnnyQQQQ](https://github.com/JohnnyQQQQ) |

[<img alt="jeffbcross" src="https://avatars2.githubusercontent.com/u/463703?v=4&s=117" width="117">](https://github.com/jeffbcross) |[<img alt="Drane" src="https://avatars1.githubusercontent.com/u/389499?v=4&s=117" width="117">](https://github.com/Drane) |[<img alt="johnjelinek" src="https://avatars2.githubusercontent.com/u/873610?v=4&s=117" width="117">](https://github.com/johnjelinek) |[<img alt="JunusErgin" src="https://avatars1.githubusercontent.com/u/7281463?v=4&s=117" width="117">](https://github.com/JunusErgin) |[<img alt="justindujardin" src="https://avatars0.githubusercontent.com/u/101493?v=4&s=117" width="117">](https://github.com/justindujardin) |[<img alt="karlhiramoto" src="https://avatars2.githubusercontent.com/u/22713?v=4&s=117" width="117">](https://github.com/karlhiramoto) |
:---: |:---: |:---: |:---: |:---: |:---: |
[jeffbcross](https://github.com/jeffbcross) |[Drane](https://github.com/Drane) |[johnjelinek](https://github.com/johnjelinek) |[JunusErgin](https://github.com/JunusErgin) |[justindujardin](https://github.com/justindujardin) |[karlhiramoto](https://github.com/karlhiramoto) |

[<img alt="lihaibh" src="https://avatars3.githubusercontent.com/u/4681233?v=4&s=117" width="117">](https://github.com/lihaibh) |[<img alt="Brooooooklyn" src="https://avatars1.githubusercontent.com/u/3468483?v=4&s=117" width="117">](https://github.com/Brooooooklyn) |[<img alt="tandu" src="https://avatars0.githubusercontent.com/u/273313?v=4&s=117" width="117">](https://github.com/tandu) |[<img alt="inkidotcom" src="https://avatars3.githubusercontent.com/u/100466?v=4&s=117" width="117">](https://github.com/inkidotcom) |[<img alt="mpetkov" src="https://avatars1.githubusercontent.com/u/8858458?v=4&s=117" width="117">](https://github.com/mpetkov) |[<img alt="daixtrose" src="https://avatars2.githubusercontent.com/u/5588692?v=4&s=117" width="117">](https://github.com/daixtrose) |
:---: |:---: |:---: |:---: |:---: |:---: |
[lihaibh](https://github.com/lihaibh) |[Brooooooklyn](https://github.com/Brooooooklyn) |[tandu](https://github.com/tandu) |[inkidotcom](https://github.com/inkidotcom) |[mpetkov](https://github.com/mpetkov) |[daixtrose](https://github.com/daixtrose) |

[<img alt="maxklenk" src="https://avatars0.githubusercontent.com/u/3898310?v=4&s=117" width="117">](https://github.com/maxklenk) |[<img alt="mjwwit" src="https://avatars3.githubusercontent.com/u/4455124?v=4&s=117" width="117">](https://github.com/mjwwit) |[<img alt="oferze" src="https://avatars3.githubusercontent.com/u/5157769?v=4&s=117" width="117">](https://github.com/oferze) |[<img alt="ocombe" src="https://avatars0.githubusercontent.com/u/265378?v=4&s=117" width="117">](https://github.com/ocombe) |[<img alt="PatrickJS" src="https://avatars3.githubusercontent.com/u/1016365?v=4&s=117" width="117">](https://github.com/PatrickJS) |[<img alt="typekpb" src="https://avatars1.githubusercontent.com/u/499820?v=4&s=117" width="117">](https://github.com/typekpb) |
:---: |:---: |:---: |:---: |:---: |:---: |
[maxklenk](https://github.com/maxklenk) |[mjwwit](https://github.com/mjwwit) |[oferze](https://github.com/oferze) |[ocombe](https://github.com/ocombe) |[PatrickJS](https://github.com/PatrickJS) |[typekpb](https://github.com/typekpb) |

[<img alt="pavlovich" src="https://avatars0.githubusercontent.com/u/1209167?v=4&s=117" width="117">](https://github.com/pavlovich) |[<img alt="philipooo" src="https://avatars3.githubusercontent.com/u/1702399?v=4&s=117" width="117">](https://github.com/philipooo) |[<img alt="TTy32" src="https://avatars1.githubusercontent.com/u/732155?v=4&s=117" width="117">](https://github.com/TTy32) |[<img alt="redian" src="https://avatars2.githubusercontent.com/u/816941?v=4&s=117" width="117">](https://github.com/redian) |[<img alt="robbatt" src="https://avatars2.githubusercontent.com/u/1379424?v=4&s=117" width="117">](https://github.com/robbatt) |[<img alt="robertpenner" src="https://avatars0.githubusercontent.com/u/79827?v=4&s=117" width="117">](https://github.com/robertpenner) |
:---: |:---: |:---: |:---: |:---: |:---: |
[pavlovich](https://github.com/pavlovich) |[philipooo](https://github.com/philipooo) |[TTy32](https://github.com/TTy32) |[redian](https://github.com/redian) |[robbatt](https://github.com/robbatt) |[robertpenner](https://github.com/robertpenner) |

[<img alt="Sjiep" src="https://avatars3.githubusercontent.com/u/5003111?v=4&s=117" width="117">](https://github.com/Sjiep) |[<img alt="RoxKilly" src="https://avatars1.githubusercontent.com/u/12346501?v=4&s=117" width="117">](https://github.com/RoxKilly) |[<img alt="SamVerschueren" src="https://avatars2.githubusercontent.com/u/1913805?v=4&s=117" width="117">](https://github.com/SamVerschueren) |[<img alt="sclausen" src="https://avatars1.githubusercontent.com/u/916076?v=4&s=117" width="117">](https://github.com/sclausen) |[<img alt="heavymery" src="https://avatars1.githubusercontent.com/u/3417123?v=4&s=117" width="117">](https://github.com/heavymery) |[<img alt="na-oma" src="https://avatars2.githubusercontent.com/u/13700206?v=4&s=117" width="117">](https://github.com/na-oma) |
:---: |:---: |:---: |:---: |:---: |:---: |
[Sjiep](https://github.com/Sjiep) |[RoxKilly](https://github.com/RoxKilly) |[SamVerschueren](https://github.com/SamVerschueren) |[sclausen](https://github.com/sclausen) |[heavymery](https://github.com/heavymery) |[na-oma](https://github.com/na-oma) |

[<img alt="tapas4java" src="https://avatars0.githubusercontent.com/u/2254963?v=4&s=117" width="117">](https://github.com/tapas4java) |[<img alt="tsvetomir" src="https://avatars1.githubusercontent.com/u/247917?v=4&s=117" width="117">](https://github.com/tsvetomir) |[<img alt="valera-rozuvan" src="https://avatars1.githubusercontent.com/u/2273090?v=4&s=117" width="117">](https://github.com/valera-rozuvan) |[<img alt="vincentpalita" src="https://avatars3.githubusercontent.com/u/2738822?v=4&s=117" width="117">](https://github.com/vincentpalita) |[<img alt="VladimirMakaev" src="https://avatars3.githubusercontent.com/u/2001475?v=4&s=117" width="117">](https://github.com/VladimirMakaev) |[<img alt="Yalrafih" src="https://avatars1.githubusercontent.com/u/7460011?v=4&s=117" width="117">](https://github.com/Yalrafih) |
:---: |:---: |:---: |:---: |:---: |:---: |
[tapas4java](https://github.com/tapas4java) |[tsvetomir](https://github.com/tsvetomir) |[valera-rozuvan](https://github.com/valera-rozuvan) |[vincentpalita](https://github.com/vincentpalita) |[VladimirMakaev](https://github.com/VladimirMakaev) |[Yalrafih](https://github.com/Yalrafih) |

[<img alt="arioth" src="https://avatars3.githubusercontent.com/u/3458082?v=4&s=117" width="117">](https://github.com/arioth) |[<img alt="billsworld" src="https://avatars3.githubusercontent.com/u/16911647?v=4&s=117" width="117">](https://github.com/billsworld) |[<img alt="blackheart01" src="https://avatars1.githubusercontent.com/u/1414277?v=4&s=117" width="117">](https://github.com/blackheart01) |[<img alt="butterfieldcons" src="https://avatars2.githubusercontent.com/u/12204784?v=4&s=117" width="117">](https://github.com/butterfieldcons) |[<img alt="danielcrisp" src="https://avatars1.githubusercontent.com/u/1104814?v=4&s=117" width="117">](https://github.com/danielcrisp) |[<img alt="gforceg" src="https://avatars3.githubusercontent.com/u/14267747?v=4&s=117" width="117">](https://github.com/gforceg) |
:---: |:---: |:---: |:---: |:---: |:---: |
[arioth](https://github.com/arioth) |[billsworld](https://github.com/billsworld) |[blackheart01](https://github.com/blackheart01) |[butterfieldcons](https://github.com/butterfieldcons) |[danielcrisp](https://github.com/danielcrisp) |[gforceg](https://github.com/gforceg) |

[<img alt="jgolla" src="https://avatars3.githubusercontent.com/u/1542447?v=4&s=117" width="117">](https://github.com/jgolla) |[<img alt="locinus" src="https://avatars1.githubusercontent.com/u/29314302?v=4&s=117" width="117">](https://github.com/locinus) |[<img alt="omerfarukyilmaz" src="https://avatars3.githubusercontent.com/u/5538485?v=4&s=117" width="117">](https://github.com/omerfarukyilmaz) |[<img alt="ZuSe" src="https://avatars3.githubusercontent.com/u/522403?v=4&s=117" width="117">](https://github.com/ZuSe) |[<img alt="ruffiem" src="https://avatars1.githubusercontent.com/u/1785492?v=4&s=117" width="117">](https://github.com/ruffiem) |[<img alt="savcha" src="https://avatars0.githubusercontent.com/u/879542?v=4&s=117" width="117">](https://github.com/savcha) |
:---: |:---: |:---: |:---: |:---: |:---: |
[jgolla](https://github.com/jgolla) |[locinus](https://github.com/locinus) |[omerfarukyilmaz](https://github.com/omerfarukyilmaz) |[ZuSe](https://github.com/ZuSe) |[ruffiem](https://github.com/ruffiem) |[savcha](https://github.com/savcha) |

[<img alt="tobiaseisenschenk" src="https://avatars3.githubusercontent.com/u/17195795?v=4&s=117" width="117">](https://github.com/tobiaseisenschenk) |[<img alt="ultrasonicsoft" src="https://avatars3.githubusercontent.com/u/4145169?v=4&s=117" width="117">](https://github.com/ultrasonicsoft) |[<img alt="yassirh" src="https://avatars2.githubusercontent.com/u/4649139?v=4&s=117" width="117">](https://github.com/yassirh) |
:---: |:---: |:---: |
[tobiaseisenschenk](https://github.com/tobiaseisenschenk) |[ultrasonicsoft](https://github.com/ultrasonicsoft) |[yassirh](https://github.com/yassirh) |

## Wiki Contributors

Here are all the awesome guys who are helping to make the project's wiki even better!

```
60  Minko Gechev
35  Clayton K. N. Passos
15  Shyam-Chen
14  Vincent van Proosdij
 8  Robert van Kints
 8  matthew harwood
 8  Christian Dobert
 7  Neo Minchul Chae
 6  Ludovic HENIN
 6  ruffiem
 5  Attila Egyed
 5  hhubik
 4  Chris Kapilla
 4  davidgfolch
 4  gforceg
 4  Brian Kotek
 3  Ezequiel Cicala
 3  Stefan Schüller
 3  Kirill Zdornyy
 3  Patrick Hillert
 3  Robert Stoll
 2  Dinsitro
 2  Brooke Smith
 2  Joshua Wiens
 2  Daniele Zurico
 2  Amal Shehu
 2  Cy Klassen
 2  Nathan Walker
 2  Simon Hampton
 2  omerfarukyilmaz
 2  Hank Ehly
 2  zealitude
 2  Paul Davis
 2  valentin
 2  Giovanni Candido da Silva
 2  Drake Wilson
 2  Yannick Koehler
 1  jovermier
 1  kiuka
 1  mcchae7
 1  neridonk
 1  samuelfernandez
 1  silicakes
 1  zcsongor
 1  Adam Johannesmeyer
 1  陳彥澄
 1  Alexander Yamkov
 1  Ameer Nuri
 1  Ankit Kamboj
 1  BouncingBit
 1  Charlie Hua
 1  Dang Tung
 1  EBIA
 1  Eddie Sun
 1  Enrico Secondulfo
 1  Eugene Serkin
 1  Fede Guzmán
 1  Frido Koch
 1  Ishara Samantha
 1  Jack Morrissey
 1  Jesper Rønn-Jensen
 1  José Rebelo
 1  Karasu
 1  Marc-André Barbeau
 1  Mathias Døhl
 1  Myrmex
 1  Pol Stafford
 1  Raphael Schmitt
 1  Sebastian Fuss
 1  Sebastien de Salvador
 1  Shyam Chen
 1  Simon Altschuler
 1  Sylvain Francois
 1  The Ult
 1  Valentyn Yakymenko
 1  Vivin Antony
 1  Yen-cheng Chen, 陳彥澄
 1  Yonet
 1  Zakhar Gulchak
 1  ganesansays
 1  geo101
 1  graham
```

# Change Log

You can follow the [Angular change log here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# License

MIT
