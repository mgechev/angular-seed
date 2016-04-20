# Introduction

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![Build Status](https://travis-ci.org/mgechev/angular2-seed.svg?branch=master)](https://travis-ci.org/mgechev/angular2-seed)
[![Build Status](https://ci.appveyor.com/api/projects/status/github/mgechev/angular2-seed?svg=true)](https://ci.appveyor.com/project/mgechev/angular2-seed)
[![Join the chat at https://gitter.im/mgechev/angular2-seed](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angular2-seed?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/mgechev/angular2-seed.svg)](https://david-dm.org/mgechev/angular2-seed)
[![devDependency Status](https://david-dm.org/mgechev/angular2-seed/dev-status.svg)](https://david-dm.org/mgechev/angular2-seed#info=devDependencies)

A modular seed project for Angular 2/Express (TypeScript) apps, running on Bluemix.

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
- Has autoprefixer and css-lint support.
- Basic Service Worker, which implements "Cache then network strategy".
- Use [Ani Angular 2 Theme](http://startangular.com/product/ani-angular-2-theme/). Recommends to extend to premium theme.
- Run on IBM Bluemix

# How to start

**Note** that this seed project requires node v5.5.x or higher and npm 3.7.5.

In order to start the seed use:


```bash
git clone --depth 1 https://github.com/rtang03/angular2-seed.git
cd angular2-seed
# install the project's dependencies
npm install
# dev build
npm run build.dev
# prod build
npm run build.prod
# run dev build (watch/livereload disabled)
npm run serve.dev.ts
# run prod build (watch/livereload disabled)
npm run serve.prod.ts
```

_Does not rely on any global dependencies._


# Configuration

Default application server configuration

```javascript
var PORT             = 3000;
var APP_BASE         = '/';
```

###  Deploying Ng2 To IBM Bluemix
IBM Bluemix is a Cloud Foundry based PaaS.  By clicking the button below you can signup for Bluemix and deploy
a working copy of ng2-seed to the cloud without having to do the steps above.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https%3A%2F%2Fgithub.com%2Frtang03%2Fangular2-seed)

After the deployment is finished you will be left with a copy of the angular2-seed code in your own private Git repo
in Bluemix complete with a pre-configured build and deploy pipeline.  Just clone the Git repo, make your changes, and
commit them back.  Once your changes are committed, the build and deploy pipeline will run automatically deploying
your changes to Bluemix.


# Change Log

You can follow the [Angular 2 change log here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# License

MIT
