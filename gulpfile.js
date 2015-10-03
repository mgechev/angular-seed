"use strict";

// Gulp dev.
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var utils = require('./tools/utils');

// Gulp prod.
// var concat = require('gulp-concat');
// var filter = require('gulp-filter');
// var minifyCSS = require('gulp-minify-css');
// var minifyHTML = require('gulp-minify-html');
// var uglify = require('gulp-uglify');

function tasks(task, options) {
    return require('./tools/tasks/' + task)(gulp, plugins, options);
}


// --------------
// Clean.
gulp.task('clean', tasks('clean', 'clean'));
gulp.task('clean.dev', tasks('clean', 'clean.dev'));
gulp.task('clean.app.dev', tasks('clean', 'clean.app.dev'));
gulp.task('clean.test', tasks('clean', 'test'));
gulp.task('clean.tsd_typings', tasks('clean', 'tsd_typings'));


// --------------
// Build dev.
gulp.task('build.lib.dev', tasks('build.lib.dev'));
gulp.task('build.js.dev', tasks('build.js.dev'));
gulp.task('build.linter.js.dev', tasks('build.linter.js.dev'));
gulp.task('build.linter.ts.dev', tasks('build.linter.ts.dev'));
gulp.task('build.assets.dev', ['build.js.dev', 'build.linter.js.dev', 'build.linter.ts.dev'], tasks('build.assets.dev'));
gulp.task('build.index.dev', tasks('build.index.dev'));
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
gulp.task('build.test', tasks('build.test'));
gulp.task('karma.start', ['build.test'], tasks('karma.start'));
gulp.task('test-dev', ['build.test'], tasks('test-dev'));
gulp.task('test', ['karma.start'], tasks('test'));


// --------------
// Post install
gulp.task('install.typings', ['clean.tsd_typings'], shell.task([
  'npm prune',
  'tsd reinstall --overwrite',
  'tsd link',
  'tsd rebundle'
]));

gulp.task('postinstall', function (done) {
  runSequence(['clean', 'clean.test'], 'install.typings', done);
});


// --------------
// Serve dev.
gulp.task('serve.dev', ['build.dev', 'livereload'], tasks('serve.dev'));


// --------------
// Serve prod.

// To be implemented (https://github.com/mgechev/angular2-seed/issues/58)


// --------------
// Livereload.
gulp.task('livereload', function() {
    utils.livereload();
});
