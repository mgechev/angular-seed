# Introduction

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![Build Status](https://travis-ci.org/mgechev/angular2-seed.svg?branch=master)](https://travis-ci.org/mgechev/angular2-seed)
[![Join the chat at https://gitter.im/mgechev/angular2-seed](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angular2-seed?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/mgechev/angular2-seed.svg)](https://david-dm.org/mgechev/angular2-seed)
[![devDependency Status](https://david-dm.org/mgechev/angular2-seed/dev-status.svg)](https://david-dm.org/mgechev/angular2-seed#info=devDependencies)

A modular seed project for Angular 2 apps.

It is something similar to the Angular Quick Start but does the entire build with gulp.

`angular2-seed` provides the following features:

- Allows you to painlessly update the seed tasks of your already existing project.
- Ready to go, statically typed build system using gulp for working with TypeScript.
- Production and development builds.
- Sample unit tests with Jasmine and Karma including code coverage via [istanbul](https://gotwarlost.github.io/istanbul/).
- End-to-end tests with Protractor.
- Development server with Livereload.
- Following the [best practices for your application’s structure](https://github.com/mgechev/angular2-style-guide).
- Manager of your type definitions using [typings](https://github.com/typings/typings).
- Basic Service Worker, which implements "Cache then network strategy".

# How to start

**Note** that this seed project requires node v4.x.x or higher and npm 2.14.7.

You must have `ts-node` installed as global. If you don't, use:

```bash
npm install -g ts-node
```

In order to start the seed use:


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
# prod build view
npm run prod

```

_Does not rely on any global dependencies._

# Table of Content

- [Introduction](#introduction)
- [How to start](#how-to-start)
- [Table of Content](#table-of-content)
- [Configuration](#configuration)
- [How to extend?](#how-to-extend)
- [Running tests](#running-tests)
- [Contributing](#contributing)
- [Examples](#examples)
- [Directory Structure](#directory-structure)
- [Contributors](#contributors)
- [Change Log](#change-log)
- [License](#license)

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

Visit the [Wiki page](https://github.com/mgechev/angular2-seed/wiki) of the project.

# Running tests

```bash
npm test

# Debug - In two different shell windows
npm run build.test.watch      # 1st window
npm run karma.start           # 2nd window

# code coverage (istanbul)
# auto-generated at the end of `npm test`
# view coverage report:
npm run serve.coverage

# e2e (aka. end-to-end, integration) - In three different shell windows
# Make sure you don't have a global instance of Protractor

# npm run webdriver-update <- You will need to run this the first time
npm run webdriver-start
npm run serve.e2e
npm run e2e

# e2e live mode - Protractor interactive mode
# Instead of last command above, you can use:
npm run e2e.live
```
You can learn more about [Protractor Interactive Mode here](https://github.com/angular/protractor/blob/master/docs/debugging.md#testing-out-protractor-interactively)

# Contributing

Please see the [CONTRIBUTING](https://github.com/mgechev/angular2-seed/blob/master/.github/CONTRIBUTING.md) file for guidelines.

# Examples

Forks of this project demonstrate how to extend and integrate with other libraries:

 - https://github.com/justindujardin/angular2-seed - integration with [ng2-material](https://github.com/justindujardin/ng2-material)
 - https://github.com/archfirst/angular2-seed-sass - integration with [Sass](http://sass-lang.com/)
 - https://github.com/AngularShowcase/angular2-sample-app - sample Angular 2 application
 - https://github.com/AngularShowcase/ng2-bootstrap-sbadmin - ng2-bootstrap-sbadmin
 - https://github.com/AngularShowcase/angular2-seed-ng2-highcharts - Simple application including a [Highcharts](http://www.highcharts.com) graph.
 - https://github.com/tarlepp/angular-sailsjs-boilerplate-frontend-angular2 - Example application for [Sails.js](http://sailsjs.org/) integration.
 - https://github.com/ludohenin/ng2-wp-blog - Angular 2 application using Wordpress [JSON-API](http://v2.wp-api.org) backend.
 - https://github.com/AngularShowcase/angular2-seed-example-mashup - Angular 2 application demonstrating the use of [Redux](http://redux.js.org/), [D3](https://github.com/mbostock/d3), [socket io](https://github.com/socketio), [Google Charts](https://developers.google.com/chart/), and [RxJs](https://github.com/Reactive-Extensions/RxJS)

# Directory Structure

```
.
├── LICENSE
├── README.md
├── gulpfile.ts                <- configuration of the gulp tasks
├── karma.conf.js              <- configuration of the test runner
├── package.json               <- dependencies of the project
├── protractor.conf.js         <- e2e tests configuration
├── src                        <- source code of the application
│   ├── home
│   │   └── components
│   ├── index.html
│   ├── main.ts
│   ├── shared
│   │   └── services
│   │       ├── name-list...
│   │       └── name-list...
│   └── sw.js                  <- sample service worker
├── test-main.js               <- testing configuration
├── tools
│   ├── README.md              <- build documentation
│   ├── config
│   │   ├── project.config.ts  <- configuration of the specific project
│   │   ├── seed.config....
│   │   └── seed.config.ts     <- generic configuration of the seed project
│   ├── config.ts              <- exported configuration (merge both seed.config and project.config, project.config overrides seed.config)
│   ├── debug.ts
│   ├── manual_typings
│   │   ├── project            <- manual ambient typings for the project
│   │   │   └── sample.pac...
│   │   └── seed               <- seed manual ambient typings
│   │       ├── merge-stre..
│   │       └── slash.d.ts
│   ├── tasks                  <- gulp tasks
│   │   ├── project            <- project specific gulp tasks
│   │   │   └── sample.tas...
│   │   └── seed               <- seed generic gulp tasks. They can be overriden by the project specific gulp tasks
│   ├── utils                  <- build utils
│   │   ├── project            <- project specific gulp utils
│   │   │   └── sample_util...
│   │   ├── project.utils.ts
│   │   ├── seed               <- seed specific gulp utils
│   │   │   ├── clean.ts
│   │   │   ├── code_change...
│   │   │   ├── server.ts
│   │   │   ├── tasks_tools.ts
│   │   │   ├── template_loc...
│   │   │   ├── tsproject.ts
│   │   │   └── watch.ts
│   │   └── seed.utils.ts
│   └── utils.ts
├── tsconfig.json              <- configuration of the typescript project (ts-node, which runs the tasks defined in gulpfile.ts)
├── tslint.json                <- tslint configuration
├── typings                    <- typings directory. Contains all the external typing definitions defined with typings
├── typings.json
└── appveyor.yml
```

# Contributors

[<img alt="mgechev" src="https://avatars.githubusercontent.com/u/455023?v=3&s=117" width="117">](https://github.com/mgechev) |[<img alt="ludohenin" src="https://avatars.githubusercontent.com/u/1011516?v=3&s=117" width="117">](https://github.com/ludohenin) |[<img alt="tarlepp" src="https://avatars.githubusercontent.com/u/595561?v=3&s=117" width="117">](https://github.com/tarlepp) |[<img alt="d3viant0ne" src="https://avatars.githubusercontent.com/u/8420490?v=3&s=117" width="117">](https://github.com/d3viant0ne) |[<img alt="NathanWalker" src="https://avatars.githubusercontent.com/u/457187?v=3&s=117" width="117">](https://github.com/NathanWalker) |[<img alt="nareshbhatia" src="https://avatars.githubusercontent.com/u/1220198?v=3&s=117" width="117">](https://github.com/nareshbhatia) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[ludohenin](https://github.com/ludohenin) |[tarlepp](https://github.com/tarlepp) |[d3viant0ne](https://github.com/d3viant0ne) |[NathanWalker](https://github.com/NathanWalker) |[nareshbhatia](https://github.com/nareshbhatia) |

[<img alt="jesperronn" src="https://avatars.githubusercontent.com/u/6267?v=3&s=117" width="117">](https://github.com/jesperronn) |[<img alt="aboeglin" src="https://avatars.githubusercontent.com/u/8297302?v=3&s=117" width="117">](https://github.com/aboeglin) |[<img alt="ryzy" src="https://avatars.githubusercontent.com/u/994940?v=3&s=117" width="117">](https://github.com/ryzy) |[<img alt="pgrzeszczak" src="https://avatars.githubusercontent.com/u/3300099?v=3&s=117" width="117">](https://github.com/pgrzeszczak) |[<img alt="natarajanmca11" src="https://avatars.githubusercontent.com/u/9244766?v=3&s=117" width="117">](https://github.com/natarajanmca11) |[<img alt="e-oz" src="https://avatars.githubusercontent.com/u/526352?v=3&s=117" width="117">](https://github.com/e-oz) |
:---: |:---: |:---: |:---: |:---: |:---: |
[jesperronn](https://github.com/jesperronn) |[aboeglin](https://github.com/aboeglin) |[ryzy](https://github.com/ryzy) |[pgrzeszczak](https://github.com/pgrzeszczak) |[natarajanmca11](https://github.com/natarajanmca11) |[e-oz](https://github.com/e-oz) |

[<img alt="jerryorta-dev" src="https://avatars.githubusercontent.com/u/341155?v=3&s=117" width="117">](https://github.com/jerryorta-dev) |[<img alt="JakePartusch" src="https://avatars.githubusercontent.com/u/6424140?v=3&s=117" width="117">](https://github.com/JakePartusch) |[<img alt="ouq77" src="https://avatars.githubusercontent.com/u/1796191?v=3&s=117" width="117">](https://github.com/ouq77) |[<img alt="LuxDie" src="https://avatars.githubusercontent.com/u/12536671?v=3&s=117" width="117">](https://github.com/LuxDie) |[<img alt="TheDonDope" src="https://avatars.githubusercontent.com/u/1188033?v=3&s=117" width="117">](https://github.com/TheDonDope) |[<img alt="larsthorup" src="https://avatars.githubusercontent.com/u/1202959?v=3&s=117" width="117">](https://github.com/larsthorup) |
:---: |:---: |:---: |:---: |:---: |:---: |
[jerryorta-dev](https://github.com/jerryorta-dev) |[JakePartusch](https://github.com/JakePartusch) |[ouq77](https://github.com/ouq77) |[LuxDie](https://github.com/LuxDie) |[TheDonDope](https://github.com/TheDonDope) |[larsthorup](https://github.com/larsthorup) |

[<img alt="TuiKiken" src="https://avatars.githubusercontent.com/u/959821?v=3&s=117" width="117">](https://github.com/TuiKiken) |[<img alt="devanp92" src="https://avatars.githubusercontent.com/u/4533277?v=3&s=117" width="117">](https://github.com/devanp92) |[<img alt="c-ice" src="https://avatars.githubusercontent.com/u/347238?v=3&s=117" width="117">](https://github.com/c-ice) |[<img alt="markharding" src="https://avatars.githubusercontent.com/u/851436?v=3&s=117" width="117">](https://github.com/markharding) |[<img alt="the-ult" src="https://avatars.githubusercontent.com/u/4863062?v=3&s=117" width="117">](https://github.com/the-ult) |[<img alt="ojacquemart" src="https://avatars.githubusercontent.com/u/1189345?v=3&s=117" width="117">](https://github.com/ojacquemart) |
:---: |:---: |:---: |:---: |:---: |:---: |
[TuiKiken](https://github.com/TuiKiken) |[devanp92](https://github.com/devanp92) |[c-ice](https://github.com/c-ice) |[markharding](https://github.com/markharding) |[the-ult](https://github.com/the-ult) |[ojacquemart](https://github.com/ojacquemart) |

[<img alt="evanplaice" src="https://avatars.githubusercontent.com/u/303159?v=3&s=117" width="117">](https://github.com/evanplaice) |[<img alt="juristr" src="https://avatars.githubusercontent.com/u/542458?v=3&s=117" width="117">](https://github.com/juristr) |[<img alt="briantopping" src="https://avatars.githubusercontent.com/u/158115?v=3&s=117" width="117">](https://github.com/briantopping) |[<img alt="brendanbenson" src="https://avatars.githubusercontent.com/u/866866?v=3&s=117" width="117">](https://github.com/brendanbenson) |[<img alt="allenhwkim" src="https://avatars.githubusercontent.com/u/1437734?v=3&s=117" width="117">](https://github.com/allenhwkim) |[<img alt="dszymczuk" src="https://avatars.githubusercontent.com/u/539352?v=3&s=117" width="117">](https://github.com/dszymczuk) |
:---: |:---: |:---: |:---: |:---: |:---: |
[evanplaice](https://github.com/evanplaice) |[juristr](https://github.com/juristr) |[briantopping](https://github.com/briantopping) |[brendanbenson](https://github.com/brendanbenson) |[allenhwkim](https://github.com/allenhwkim) |[dszymczuk](https://github.com/dszymczuk) |

[<img alt="njs50" src="https://avatars.githubusercontent.com/u/55112?v=3&s=117" width="117">](https://github.com/njs50) |[<img alt="dstockhammer" src="https://avatars.githubusercontent.com/u/1156637?v=3&s=117" width="117">](https://github.com/dstockhammer) |[<img alt="koodikindral" src="https://avatars.githubusercontent.com/u/6285484?v=3&s=117" width="117">](https://github.com/koodikindral) |[<img alt="Green-Cat" src="https://avatars.githubusercontent.com/u/3328823?v=3&s=117" width="117">](https://github.com/Green-Cat) |[<img alt="hpinsley" src="https://avatars.githubusercontent.com/u/750098?v=3&s=117" width="117">](https://github.com/hpinsley) |[<img alt="jeffbcross" src="https://avatars.githubusercontent.com/u/463703?v=3&s=117" width="117">](https://github.com/jeffbcross) |
:---: |:---: |:---: |:---: |:---: |:---: |
[njs50](https://github.com/njs50) |[dstockhammer](https://github.com/dstockhammer) |[koodikindral](https://github.com/koodikindral) |[Green-Cat](https://github.com/Green-Cat) |[hpinsley](https://github.com/hpinsley) |[jeffbcross](https://github.com/jeffbcross) |

[<img alt="johnjelinek" src="https://avatars.githubusercontent.com/u/873610?v=3&s=117" width="117">](https://github.com/johnjelinek) |[<img alt="justindujardin" src="https://avatars.githubusercontent.com/u/101493?v=3&s=117" width="117">](https://github.com/justindujardin) |[<img alt="lihaibh" src="https://avatars.githubusercontent.com/u/4681233?v=3&s=117" width="117">](https://github.com/lihaibh) |[<img alt="Brooooooklyn" src="https://avatars.githubusercontent.com/u/3468483?v=3&s=117" width="117">](https://github.com/Brooooooklyn) |[<img alt="tandu" src="https://avatars.githubusercontent.com/u/273313?v=3&s=117" width="117">](https://github.com/tandu) |[<img alt="inkidotcom" src="https://avatars.githubusercontent.com/u/100466?v=3&s=117" width="117">](https://github.com/inkidotcom) |
:---: |:---: |:---: |:---: |:---: |:---: |
[johnjelinek](https://github.com/johnjelinek) |[justindujardin](https://github.com/justindujardin) |[lihaibh](https://github.com/lihaibh) |[Brooooooklyn](https://github.com/Brooooooklyn) |[tandu](https://github.com/tandu) |[inkidotcom](https://github.com/inkidotcom) |

[<img alt="mjwwit" src="https://avatars.githubusercontent.com/u/4455124?v=3&s=117" width="117">](https://github.com/mjwwit) |[<img alt="dwido" src="https://avatars.githubusercontent.com/u/154235?v=3&s=117" width="117">](https://github.com/dwido) |[<img alt="ocombe" src="https://avatars.githubusercontent.com/u/265378?v=3&s=117" width="117">](https://github.com/ocombe) |[<img alt="gdi2290" src="https://avatars.githubusercontent.com/u/1016365?v=3&s=117" width="117">](https://github.com/gdi2290) |[<img alt="typekpb" src="https://avatars.githubusercontent.com/u/499820?v=3&s=117" width="117">](https://github.com/typekpb) |[<img alt="philipooo" src="https://avatars.githubusercontent.com/u/1702399?v=3&s=117" width="117">](https://github.com/philipooo) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mjwwit](https://github.com/mjwwit) |[dwido](https://github.com/dwido) |[ocombe](https://github.com/ocombe) |[gdi2290](https://github.com/gdi2290) |[typekpb](https://github.com/typekpb) |[philipooo](https://github.com/philipooo) |

[<img alt="redian" src="https://avatars.githubusercontent.com/u/816941?v=3&s=117" width="117">](https://github.com/redian) |[<img alt="Bigous" src="https://avatars.githubusercontent.com/u/6886560?v=3&s=117" width="117">](https://github.com/Bigous) |[<img alt="robertpenner" src="https://avatars.githubusercontent.com/u/79827?v=3&s=117" width="117">](https://github.com/robertpenner) |[<img alt="sclausen" src="https://avatars.githubusercontent.com/u/916076?v=3&s=117" width="117">](https://github.com/sclausen) |[<img alt="tapas4java" src="https://avatars.githubusercontent.com/u/2254963?v=3&s=117" width="117">](https://github.com/tapas4java) |[<img alt="butterfieldcons" src="https://avatars.githubusercontent.com/u/12204784?v=3&s=117" width="117">](https://github.com/butterfieldcons) |
:---: |:---: |:---: |:---: |:---: |:---: |
[redian](https://github.com/redian) |[Bigous](https://github.com/Bigous) |[robertpenner](https://github.com/robertpenner) |[sclausen](https://github.com/sclausen) |[tapas4java](https://github.com/tapas4java) |[butterfieldcons](https://github.com/butterfieldcons) |

[<img alt="jgolla" src="https://avatars.githubusercontent.com/u/1542447?v=3&s=117" width="117">](https://github.com/jgolla) |[<img alt="ultrasonicsoft" src="https://avatars.githubusercontent.com/u/4145169?v=3&s=117" width="117">](https://github.com/ultrasonicsoft) |
:---: |:---: |
[jgolla](https://github.com/jgolla) |[ultrasonicsoft](https://github.com/ultrasonicsoft) |

# Change Log

You can follow the [Angular 2 change log here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# License

MIT