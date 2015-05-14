'use strict';

var gulp = require('gulp');
var del = require('del');
var Builder = require('systemjs-builder');
var traceur = require('gulp-traceur');

gulp.task('clean', function (done) {
  del(['dev'], done);
});

gulp.task('build:angular2', function () {
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
  return builder.build('angular2/angular2', './lib/angular2.js', {});
});

gulp.task('build:lib', ['build:angular2'], function () {
  gulp.src([
    './node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
    './node_modules/angular2/node_modules/zone.js/zone.js',
    './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
    './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
    './node_modules/reflect-metadata/Reflect.js',
    './node_modules/reflect-metadata/Reflect.js.map',
    './node_modules/systemjs/dist/system.js',
    './node_modules/systemjs/dist/system.js.map'
  ])
  .pipe(gulp.dest('./lib'));
});

gulp.task('build', function () {
  return gulp.src('./js/**/*.js')
    .pipe(traceur({
      sourceMaps: 'inline',
      modules: 'instantiate',
      annotations: true,
      memberVariables: true,
      types: true
    }))
    .pipe(gulp.dest('./dev'));
});

gulp.task('watch', function () {
  gulp.watch('./js/**', ['build']);
});
