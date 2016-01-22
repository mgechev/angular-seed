# Introduction

[![Build Status](https://travis-ci.org/mgechev/angular2-seed.svg?branch=master)](https://travis-ci.org/mgechev/angular2-seed)
[![Join the chat at https://gitter.im/mgechev/angular2-seed](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angular2-seed?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/mgechev/angular2-seed.svg)](https://david-dm.org/mgechev/angular2-seed)
[![devDependency Status](https://david-dm.org/mgechev/angular2-seed/dev-status.svg)](https://david-dm.org/mgechev/angular2-seed#info=devDependencies)

A seed project for Angular 2 apps.

It is something similar to the Angular Quick Start but does the entire build with gulp.

`angular2-seed` provides the following features:

- Ready to go, statically typed build system using gulp for working with TypeScript
- Production and development builds
- Sample unit tests with Jasmine and Karma
- End-to-end tests with Protractor
- Development server with Livereload
- Experimental hot loading support
- Following the best practices for your application’s structure
- Manager of your type definitions using tsd
- Basic Service Worker, which implements "Cache then network strategy"

# How to start

**Note** that this seed project requires node v4.x.x or higher and npm 2.14.7.

```bash
git clone --depth 1 https://github.com/mgechev/angular2-seed.git
cd angular2-seed
# install the project's dependencies
npm install
# watches your files and uses livereload by default
npm start
# api document for the app
npm run docs

# dev build
npm run build.dev
# prod build
npm run build.prod
```

## Using the experimental hot loader support

If you want to try the experimental [hot loading](http://blog.mgechev.com/2015/10/26/angular2-hot-loader-hot-loading-tooling/) support use:

```
npm start -- --hot-loader true
```

Note that the hot loader is still in experimental phase of development and there are some missing features. If you experience any issues with it report them at [here](https://github.com/mgechev/angular2-hot-loader/issues).

_Does not rely on any global dependencies._

# Table of Content

- [Introduction](#introduction)
- [How to start](#how-to-start)
  * [Using the experimental hot loader support](#using-the-experimental-hot-loader-support)
- [Table of Content](#table-of-content)
- [Directory Structure](#directory-structure)
- [Configuration](#configuration)
- [How to extend?](#how-to-extend-)
  * [Adding custom libraries](#adding-custom-libraries)
  * [Adding custom gulp task](#adding-custom-gulp-task)
- [Running test](#running-test)
- [Contributing](#contributing)
- [Examples](#examples)
- [Contributors](#contributors)
- [Change Log](#change-log)
- [License](#license)

# Directory Structure

```
.
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── app
│   ├── about
│   │   └── components
│   │       ├── about.e2e.ts
│   │       ├── about.html
│   │       ├── about.ts
│   │       └── about_spec.ts
│   ├── app
│   │   └── components
│   │       ├── app.css
│   │       ├── app.e2e.ts
│   │       ├── app.html
│   │       ├── app.ts
│   │       └── app_spec.ts
│   ├── assets
│   │   ├── img
│   │   │   └── smile.png
│   │   └── main.css
│   ├── home
│   │   └── components
│   │       ├── home.css
│   │       ├── home.html
│   │       ├── home.ts
│   │       └── home_spec.ts
│   ├── shared
│   │   └── services
│   │       ├── name_list.ts
│   │       └── name_list_spec.ts
│   ├── hot_loader_main.ts
│   ├── main.ts
│   └── index.html
├── dist
├── test
├── tools
│   ├── tasks
│   ├── typings
│   ├── utils
│   │   ├── code_change_tools.ts
│   │   ├── server.ts
│   │   ├── tasks_tools.ts
│   │   ├── template_injectables.ts
│   │   └── template_locals.ts
│   ├── config.ts
│   └── utils.ts
├── appveyor.yml
├── gulpfile.ts
├── karma.conf.js
├── package.json
├── protractor.conf.js
├── test-main.js
├── tsconfig.json
├── tsd.json
└── tslint.json
```

# Configuration

Default application server configuration

```javascript
var PORT             = 5555;
var LIVE_RELOAD_PORT = 4002;
var DOCS_PORT        = 4003;
var APP_BASE         = '/';
```

Configure at runtime

```bash
npm start -- --port 8080 --reload-port 4000 --base /my-app/
```

# How to extend?

## Adding custom libraries

If you want to use your custom libraries:

```bash
npm install my-library --save
vim tools/config.ts
```
Add reference to the installed library in `NPM_DEPENDENCIES`:

```ts
export const NPM_DEPENDENCIES = [
  { src: 'systemjs/dist/system-polyfills.js', dest: LIB_DEST },


  { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true, dest: CSS_DEST }
  // ...
  { src: 'my-library/dist/bundle.js', inject: true, dest: LIB_DEST }
];

```
- `src` - relative to `node_modules`
- `inject` - indicates whether the library should be injected (if not you have to include it manually in `index.html`)
- `dest` - your library will be copied to this location. Used for the production build.

**Do not forget to add a reference to the type definition inside the files where you use your custom library.**

## Adding custom gulp task

In this example we are going to add SASS support to the seed's dev build:

1. Install `gulp-sass` as dependency:

  ```bash
  npm install gulp-sass --save-dev
  ```

2. Add type definitions:

  ```bash
  # Note: tsd MUST be installed as global
  tsd install gulp-sass --save
  ```

3. Add SASS task at `./tools/tasks/build.sass.dev.ts`:

  ```ts
  import {join} from 'path';
  import {APP_SRC, APP_DEST} from '../config';

  export = function buildSassDev(gulp, plugins, option) {
    return function () {
      return gulp.src(join(APP_SRC, '**', '*.scss'))
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(gulp.dest(APP_DEST));
    };
  }
  ```

4. Add `build.sass.dev` to your dev pipeline:

  ```ts
  // gulpfile.ts
  ...
  // --------------
  // Build dev.
  gulp.task('build.dev', done =>
    runSequence('clean.dist',
        'tslint',
        'build.sass.dev',
        'build.assets.dev',
        'build.js.dev',
        'build.index',
        done));
  ...

  ```

# Running test

```bash
npm test

# Debug - In two different shell windows
npm run build.test.watch      # 1st window
npm run karma.start           # 2nd window

# e2e (aka. end-to-end, integration) - In three different shell windows
npm start
# npm run webdriver-update <- You may need to run this the first time
npm run webdriver-start
npm run e2e

# e2e live mode - Protractor interactive mode
# Instead of last command above, you can use:
npm run e2e-live
```
You can learn more about [Protractor Interactive Mode here](https://github.com/angular/protractor/blob/master/docs/debugging.md#testing-out-protractor-interactively)

# Contributing

Please see the [CONTRIBUTING](https://github.com/mgechev/angular2-seed/blob/master/CONTRIBUTING.md) file for guidelines.

# Examples

Forks of this project demonstrate how to extend and integrate with other libraries:

 - https://github.com/justindujardin/angular2-seed - integration with [ng2-material](https://github.com/justindujardin/ng2-material)
 - https://github.com/AngularShowcase/angular2-sample-app - sample Angular 2 application
 - https://github.com/AngularShowcase/ng2-bootstrap-sbadmin - ng2-bootstrap-sbadmin
 - https://github.com/AngularShowcase/angular2-seed-ng2-highcharts - Simple application including a [Highcharts](http://www.highcharts.com) graph.
 - https://github.com/tarlepp/angular-sailsjs-boilerplate-frontend-angular2 - Example application for [Sails.js](http://sailsjs.org/) integration.

# Contributors

[<img alt="mgechev" src="https://avatars.githubusercontent.com/u/455023?v=3&s=117" width="117">](https://github.com/mgechev) |[<img alt="ludohenin" src="https://avatars.githubusercontent.com/u/1011516?v=3&s=117" width="117">](https://github.com/ludohenin) |[<img alt="tarlepp" src="https://avatars.githubusercontent.com/u/595561?v=3&s=117" width="117">](https://github.com/tarlepp) |[<img alt="NathanWalker" src="https://avatars.githubusercontent.com/u/457187?v=3&s=117" width="117">](https://github.com/NathanWalker) |[<img alt="aboeglin" src="https://avatars.githubusercontent.com/u/8297302?v=3&s=117" width="117">](https://github.com/aboeglin) |[<img alt="jesperronn" src="https://avatars.githubusercontent.com/u/6267?v=3&s=117" width="117">](https://github.com/jesperronn) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[ludohenin](https://github.com/ludohenin) |[tarlepp](https://github.com/tarlepp) |[NathanWalker](https://github.com/NathanWalker) |[aboeglin](https://github.com/aboeglin) |[jesperronn](https://github.com/jesperronn) |

[<img alt="ryzy" src="https://avatars.githubusercontent.com/u/994940?v=3&s=117" width="117">](https://github.com/ryzy) |[<img alt="natarajanmca11" src="https://avatars.githubusercontent.com/u/9244766?v=3&s=117" width="117">](https://github.com/natarajanmca11) |[<img alt="jerryorta-dev" src="https://avatars.githubusercontent.com/u/341155?v=3&s=117" width="117">](https://github.com/jerryorta-dev) |[<img alt="ouq77" src="https://avatars.githubusercontent.com/u/1796191?v=3&s=117" width="117">](https://github.com/ouq77) |[<img alt="JakePartusch" src="https://avatars.githubusercontent.com/u/6424140?v=3&s=117" width="117">](https://github.com/JakePartusch) |[<img alt="larsthorup" src="https://avatars.githubusercontent.com/u/1202959?v=3&s=117" width="117">](https://github.com/larsthorup) |
:---: |:---: |:---: |:---: |:---: |:---: |
[ryzy](https://github.com/ryzy) |[natarajanmca11](https://github.com/natarajanmca11) |[jerryorta-dev](https://github.com/jerryorta-dev) |[ouq77](https://github.com/ouq77) |[JakePartusch](https://github.com/JakePartusch) |[larsthorup](https://github.com/larsthorup) |

[<img alt="c-ice" src="https://avatars.githubusercontent.com/u/347238?v=3&s=117" width="117">](https://github.com/c-ice) |[<img alt="TuiKiken" src="https://avatars.githubusercontent.com/u/959821?v=3&s=117" width="117">](https://github.com/TuiKiken) |[<img alt="johnjelinek" src="https://avatars.githubusercontent.com/u/873610?v=3&s=117" width="117">](https://github.com/johnjelinek) |[<img alt="redian" src="https://avatars.githubusercontent.com/u/816941?v=3&s=117" width="117">](https://github.com/redian) |[<img alt="dwido" src="https://avatars.githubusercontent.com/u/154235?v=3&s=117" width="117">](https://github.com/dwido) |[<img alt="evanplaice" src="https://avatars.githubusercontent.com/u/303159?v=3&s=117" width="117">](https://github.com/evanplaice) |
:---: |:---: |:---: |:---: |:---: |:---: |
[c-ice](https://github.com/c-ice) |[TuiKiken](https://github.com/TuiKiken) |[johnjelinek](https://github.com/johnjelinek) |[redian](https://github.com/redian) |[dwido](https://github.com/dwido) |[evanplaice](https://github.com/evanplaice) |

[<img alt="briantopping" src="https://avatars.githubusercontent.com/u/158115?v=3&s=117" width="117">](https://github.com/briantopping) |[<img alt="justindujardin" src="https://avatars.githubusercontent.com/u/101493?v=3&s=117" width="117">](https://github.com/justindujardin) |[<img alt="lihaibh" src="https://avatars.githubusercontent.com/u/4681233?v=3&s=117" width="117">](https://github.com/lihaibh) |[<img alt="Brooooooklyn" src="https://avatars.githubusercontent.com/u/3468483?v=3&s=117" width="117">](https://github.com/Brooooooklyn) |[<img alt="tandu" src="https://avatars.githubusercontent.com/u/273313?v=3&s=117" width="117">](https://github.com/tandu) |[<img alt="markharding" src="https://avatars.githubusercontent.com/u/851436?v=3&s=117" width="117">](https://github.com/markharding) |
:---: |:---: |:---: |:---: |:---: |:---: |
[briantopping](https://github.com/briantopping) |[justindujardin](https://github.com/justindujardin) |[lihaibh](https://github.com/lihaibh) |[Brooooooklyn](https://github.com/Brooooooklyn) |[tandu](https://github.com/tandu) |[markharding](https://github.com/markharding) |

[<img alt="mjwwit" src="https://avatars.githubusercontent.com/u/4455124?v=3&s=117" width="117">](https://github.com/mjwwit) |[<img alt="ocombe" src="https://avatars.githubusercontent.com/u/265378?v=3&s=117" width="117">](https://github.com/ocombe) |[<img alt="gdi2290" src="https://avatars.githubusercontent.com/u/1016365?v=3&s=117" width="117">](https://github.com/gdi2290) |[<img alt="typekpb" src="https://avatars.githubusercontent.com/u/499820?v=3&s=117" width="117">](https://github.com/typekpb) |[<img alt="philipooo" src="https://avatars.githubusercontent.com/u/1702399?v=3&s=117" width="117">](https://github.com/philipooo) |[<img alt="dstockhammer" src="https://avatars.githubusercontent.com/u/1156637?v=3&s=117" width="117">](https://github.com/dstockhammer) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mjwwit](https://github.com/mjwwit) |[ocombe](https://github.com/ocombe) |[gdi2290](https://github.com/gdi2290) |[typekpb](https://github.com/typekpb) |[philipooo](https://github.com/philipooo) |[dstockhammer](https://github.com/dstockhammer) |

[<img alt="Bigous" src="https://avatars.githubusercontent.com/u/6886560?v=3&s=117" width="117">](https://github.com/Bigous) |[<img alt="robertpenner" src="https://avatars.githubusercontent.com/u/79827?v=3&s=117" width="117">](https://github.com/robertpenner) |[<img alt="sclausen" src="https://avatars.githubusercontent.com/u/916076?v=3&s=117" width="117">](https://github.com/sclausen) |[<img alt="butterfieldcons" src="https://avatars.githubusercontent.com/u/12204784?v=3&s=117" width="117">](https://github.com/butterfieldcons) |[<img alt="jgolla" src="https://avatars.githubusercontent.com/u/1542447?v=3&s=117" width="117">](https://github.com/jgolla) |[<img alt="ultrasonicsoft" src="https://avatars.githubusercontent.com/u/4145169?v=3&s=117" width="117">](https://github.com/ultrasonicsoft) |
:---: |:---: |:---: |:---: |:---: |:---: |
[Bigous](https://github.com/Bigous) |[robertpenner](https://github.com/robertpenner) |[sclausen](https://github.com/sclausen) |[butterfieldcons](https://github.com/butterfieldcons) |[jgolla](https://github.com/jgolla) |[ultrasonicsoft](https://github.com/ultrasonicsoft) |

# Change Log

You can follow the [Angular 2 change log here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# License

MIT
