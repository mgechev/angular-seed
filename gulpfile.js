"use strict";

// Gulp dev.
var argv = require('yargs').argv;
var gulp = require('gulp');
var inject = require('gulp-inject');
var inlineNg2Template = require('gulp-inline-ng2-template');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template');
var tsc = require('gulp-typescript');
var watch = require('gulp-watch');
// Gulp prod.
// var concat = require('gulp-concat');
// var filter = require('gulp-filter');
// var minifyCSS = require('gulp-minify-css');
// var minifyHTML = require('gulp-minify-html');
// var uglify = require('gulp-uglify');


var Builder = require('systemjs-builder');
var del = require('del');
var fs = require('fs');
var path = require('path');
var join = path.join;
var slash = require('slash');
var karma = require('karma').server;
var runSequence = require('run-sequence');
var series = require('stream-series');

var express = require('express');
var serveStatic = require('serve-static');
var openResource = require('open');

var minilr = require('mini-lr')();
var connectLivereload = require('connect-livereload');

// --------------
// Configuration.
var PORT             = argv['port']        || 5555;
var LIVE_RELOAD_PORT = argv['reload-port'] || 4002;
var APP_BASE         = argv['base']        || '/';

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
    lib: [
      // Order is quite important here for the HTML tag injection.
      require.resolve('angular2/node_modules/traceur/bin/traceur-runtime.js'),
      require.resolve('es6-module-loader/dist/es6-module-loader-sans-promises.js'),
      require.resolve('es6-module-loader/dist/es6-module-loader-sans-promises.js.map'),
      require.resolve('reflect-metadata/Reflect.js'),
      require.resolve('reflect-metadata/Reflect.js.map'),
      require.resolve('systemjs/dist/system.src.js'),
      APP_SRC + '/system.config.js',
      ANGULAR_BUNDLES + '/angular2.dev.js',
      ANGULAR_BUNDLES + '/router.dev.js',
      ANGULAR_BUNDLES + '/http.dev.js'
    ]
  }
};

var HTMLMinifierOpts = { conditionals: true };

var tsProject = tsc.createProject('tsconfig.json', {
  typescript: require('typescript')
});

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
    .pipe(inlineNg2Template({ base: 'app' }))
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

gulp.task('test-dev', ['build.test'], function() {
  watch('./app/**', function() {
    gulp.start('build.test');
  });
});

gulp.task('test', ['karma.start'], function() {
  watch('./app/**', function() {
    gulp.start('karma.start');
  });
});

// --------------
// Post install

gulp.task('install.typings', ['clean.tsd_typings'], shell.task([
  'npm prune',
  'tsd reinstall --overwrite',
  'tsd link',
  'tsd rebundle'
]));

gulp.task('postinstall', function (done) {
  runSequence('install.typings', done);
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

// To be implemented (https://github.com/mgechev/angular2-seed/issues/58)

// --------------
// Livereload.

gulp.task('livereload', function () {
  minilr.listen(LIVE_RELOAD_PORT);
});

// --------------
// Utils.

function notifyLiveReload(e) {
  var fileName = e.path;
  minilr.changed({
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
    return join(PATH.dest.dev.lib, slash(path).split('/').pop());
  });
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
