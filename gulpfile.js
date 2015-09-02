"use strict";

var gulp = require('gulp');
var bump = require('gulp-bump');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var inject = require('gulp-inject');
var inlineNg2Template = require('gulp-inline-ng2-template');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template');
var tsc = require('gulp-typescript');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var Builder = require('systemjs-builder');
var del = require('del');
var fs = require('fs');
var path = require('path');
var join = path.join;
var karma = require('karma').server;
var runSequence = require('run-sequence');
var semver = require('semver');
var series = require('stream-series');

var express = require('express');
var serveStatic = require('serve-static');
var openResource = require('open');

var tinylr = require('tiny-lr')();
var connectLivereload = require('connect-livereload');

// --------------
// Configuration.
var APP_BASE = '/';
var APP_SRC = 'app';
var APP_DEST = 'dist';
var ANGULAR_BUNDLES = './node_modules/angular2/bundles/';

var PATH = {
  dest: {
    all: APP_DEST,
    dev: {
      all: APP_DEST + '/dev',
      lib: APP_DEST + '/dev/lib'
    },
    prod: {
      all: APP_DEST + '/prod',
      lib: APP_DEST + '/prod/lib'
    }
  },
  src: {
    all: APP_SRC,
    loader: [
      './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
      './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
      './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
      './node_modules/reflect-metadata/Reflect.js',
      './node_modules/reflect-metadata/Reflect.js.map',
      './node_modules/systemjs/dist/system.src.js'
    ],
    loaderConfig: [
      APP_SRC + '/system.config.js'
    ],
    // Order is quite important here for the HTML tag injection.
    angular: [
      ANGULAR_BUNDLES + '/angular2.dev.js',
      ANGULAR_BUNDLES + '/router.dev.js',
      ANGULAR_BUNDLES + '/http.dev.js'
    ]
  }
};

PATH.src.lib = PATH.src.loader
    .concat(PATH.src.loaderConfig)
    .concat(PATH.src.angular);

var PORT = 5555;
var LIVE_RELOAD_PORT = 4002;

var HTMLMinifierOpts = { conditionals: true };

var tsProject = tsc.createProject('tsconfig.json', {
  typescript: require('typescript')
});

var semverReleases = ['major', 'premajor', 'minor', 'preminor', 'patch',
                      'prepatch', 'prerelease'];

// --------------
// Clean.

gulp.task('clean', function (done) {
  del(PATH.dest.all, done);
});

gulp.task('clean.dev', function (done) {
  del(PATH.dest.dev.all, done);
});

gulp.task('clean.app.dev', function (done) {
  del([join(PATH.dest.dev.all, '**/*'), '!' + PATH.dest.dev.lib,
       '!' + join(PATH.dest.dev.lib, '*')], done);
});

gulp.task('clean.test', function(done) {
  del('test', done);
});

gulp.task('clean.tsd_typings', function(done) {
  del('tsd_typings', done);
});

// --------------
// Build dev.

gulp.task('build.lib.dev', function () {
  return gulp.src(PATH.src.lib)
    .pipe(gulp.dest(PATH.dest.dev.lib));
});

gulp.task('build.js.dev', function () {
  var result = gulp.src([join(PATH.src.all, '**/*ts'),
                         '!' + join(PATH.src.all, '**/*_spec.ts')])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(sourcemaps.write())
    .pipe(template(templateLocals()))
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.assets.dev', ['build.js.dev'], function () {
  return gulp.src([join(PATH.src.all, '**/*.html'), join(PATH.src.all, '**/*.css')])
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.index.dev', function () {
  var target = gulp.src(injectableDevAssetsRef(), { read: false });
  return gulp.src(join(PATH.src.all, 'index.html'))
    .pipe(inject(target, { transform: transformPath('dev') }))
    .pipe(template(templateLocals()))
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.app.dev', function (done) {
  runSequence('clean.app.dev', 'build.assets.dev', 'build.index.dev', done);
});

gulp.task('build.dev', function (done) {
  runSequence('clean.dev', 'build.lib.dev', 'build.app.dev', done);
});

// --------------
// Build prod.

// To be implemented (https://github.com/mgechev/angular2-seed/issues/58)

// --------------
// Post install

gulp.task('install.typings', ['clean.tsd_typings'], shell.task([
  'tsd reinstall --overwrite',
  'tsd link',
  'tsd rebundle'
]));

gulp.task('postinstall', function (done) {
  runSequence('install.typings', done);
});

// --------------
// Version.

registerBumpTasks();

gulp.task('bump.reset', function () {
  return gulp.src('package.json')
    .pipe(bump({version: '0.0.0'}))
    .pipe(gulp.dest('./'));
});

// --------------
// Test.

gulp.task('build.test', function() {
  var result = gulp.src(['./app/**/*.ts', '!./app/init.ts'])
    .pipe(plumber())
    .pipe(inlineNg2Template({ base: 'app' }))
    .pipe(tsc(tsProject));

  return result.js
    .pipe(gulp.dest('./test'));
});

gulp.task('karma.start', ['build.test'], function(done) {

  karma.start({
    configFile: join(__dirname, 'karma.conf.js'),
    singleRun: true
  }, done);
});

gulp.task('test', ['karma.start'], function() {
  watch('./app/**', function() {
    gulp.start('karma.start');
  });
});

// --------------
// Serve dev.

gulp.task('serve.dev', ['build.dev', 'livereload'], function () {
  watch(join(PATH.src.all, '**'), function (e) {
    runSequence('build.app.dev', function () {
      notifyLiveReload(e);
    });
  });
  serveSPA('dev');
});

// --------------
// Serve prod.

gulp.task('serve.prod', ['build.prod', 'livereload'], function () {
  watch(join(PATH.src.all, '**'), function (e) {
    runSequence('build.app.prod', function () {
      notifyLiveReload(e);
    });
  });
  serveSPA('prod');
});

// --------------
// Livereload.

gulp.task('livereload', function () {
  tinylr.listen(LIVE_RELOAD_PORT);
});

// --------------
// Utils.

function notifyLiveReload(e) {
  var fileName = e.path;
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

function transformPath(env) {
  var v = '?v=' + getVersion();
  return function (filepath) {
    var filename = filepath.replace('/' + PATH.dest[env].all, '') + v;
    arguments[0] = join(APP_BASE, filename);
    return inject.transform.apply(inject.transform, arguments);
  };
}

function injectableDevAssetsRef() {
  var src = PATH.src.lib.map(function (path) {
    return join(PATH.dest.dev.lib, path.split('/').pop());
  });
  src.push(join(PATH.dest.dev.all, '**/*.css'));
  return src;
}

function getVersion() {
  var pkg = JSON.parse(fs.readFileSync('package.json'));
  return pkg.version;
}

function templateLocals() {
  return {
    VERSION: getVersion(),
    APP_BASE: APP_BASE
  };
}

function registerBumpTasks() {
  semverReleases.forEach(function (release) {
    var semverTaskName = 'semver.' + release;
    var bumpTaskName = 'bump.' + release;
    gulp.task(semverTaskName, function () {
      var version = semver.inc(getVersion(), release);
      return gulp.src('package.json')
        .pipe(bump({version: version}))
        .pipe(gulp.dest('./'));
    });
    gulp.task(bumpTaskName, function (done) {
      runSequence(semverTaskName, 'build.app.prod', done);
    });
  });
}

function serveSPA(env) {
  var app;
  app = express().use(APP_BASE, connectLivereload({ port: LIVE_RELOAD_PORT }), serveStatic(join(__dirname, PATH.dest[env].all)));
  app.all(APP_BASE + '*', function (req, res) {
    res.sendFile(join(__dirname, PATH.dest[env].all, 'index.html'));
  });
  app.listen(PORT, function () {
    openResource('http://localhost:' + PORT + APP_BASE);
  });
}
