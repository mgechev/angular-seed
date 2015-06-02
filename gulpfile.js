'use strict';

var gulp = require('gulp');
var del = require('del');
var Builder = require('systemjs-builder');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var openResource = require('open');
var join = require('path').join;

// --------------
// Configuration.

var PATH = {
  dest: {
    all: 'dist',
    dev: {
      all: 'dist/dev',
      lib: 'dist/dev/lib'
    },
    prod: {
      all: 'dist/prod',
      lib: 'dist/prod/lib'
    }
  },
  src: {
    lib: [
      './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
      './node_modules/angular2/node_modules/zone.js/dist/zone.js',
      './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
      './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
      './node_modules/reflect-metadata/Reflect.js',
      './node_modules/reflect-metadata/Reflect.js.map',
      './node_modules/systemjs/dist/system.js',
      './node_modules/systemjs/dist/system.js.map'
    ]
  }
};

var builder = new Builder({
  paths: {
    'angular2/*': 'node_modules/angular2/es6/prod/*.es6',
    rx: 'node_modules/angular2/node_modules/rx/dist/rx.js'
  },
  meta: {
    rx: {
      format: 'cjs'
    }
  }
});

var tsProject = ts.createProject('tsconfig.json', {
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
  // TODO: rework this part.
  del([join(PATH.dest.dev.all, '**/*'), '!' +
       PATH.dest.dev.lib, '!' + join(PATH.dest.dev.lib, '*')], done);
});

// --------------
// Build dev.

gulp.task('build.ng2.dev', function () {
  builder.build('angular2/router', join(PATH.dest.dev.lib, 'router.js'), {});
  return builder.build('angular2/angular2', join(PATH.dest.dev.lib, 'angular2.js'), {});
});

gulp.task('build.lib.dev', ['build.ng2.dev'], function () {
  gulp.src(PATH.src.lib)
    .pipe(gulp.dest(PATH.dest.dev.lib));
});

gulp.task('build.js.dev', ['clean.app.dev'], function () {
  var result = gulp.src('./app/**/*ts')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return result.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.app.dev', ['build.js.dev'], function () {
  return gulp.src(['./app/**/*.html', './app/**/*.css'])
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.dev', function (done) {
  runSequence('clean.dev', ['build.lib.dev', 'build.app.dev'], done);
});

// --------------
// Build prod.

// To be implemented.

// --------------
// Serve.

gulp.task('serve', ['build.app.dev'], function () {
  var port = 5555;
  var app;

  gulp.watch('./app/**', ['build.app.dev']);

  app = connect().use(serveStatic(join(__dirname, PATH.dest.dev.all)));
  http.createServer(app).listen(port, function () {
    openResource('http://localhost:' + port);
  });
});
