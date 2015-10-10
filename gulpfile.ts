// Gulp dev.
import * as gulp from 'gulp';
import * as plugins from 'gulp-load-plugins';
import * as runSequence from 'run-sequence';
import {livereload} from './tools/utils';

// Gulp prod.
// var concat = require('gulp-concat');
// var filter = require('gulp-filter');
// var minifyCSS = require('gulp-minify-css');
// var minifyHTML = require('gulp-minify-html');
// var uglify = require('gulp-uglify');

function tasks(task: string, option?: string) {
  return require('./tools/tasks/' + task)(gulp, plugins(), option);
}

// --------------
// Clean.
gulp.task('clean', tasks('clean', 'clean'));
gulp.task('clean.dist', tasks('clean', 'clean.dist'));
gulp.task('clean.app.dev', tasks('clean', 'clean.app.dev'));
gulp.task('clean.test', tasks('clean', 'test'));


// --------------
// Build dev.
gulp.task('tslint', tasks('tslint'));
gulp.task('build.lib.dev', tasks('build.lib.dev'));
gulp.task('build.js.dev', ['tslint'], tasks('build.js.dev'));
gulp.task('build.assets.dev', ['build.js.dev'], tasks('build.assets.dev'));
gulp.task('build.index.dev', tasks('build.index.dev'));
gulp.task('build.app.dev', function (done) {
  runSequence('clean.app.dev', 'build.assets.dev', 'build.index.dev', done);
});
gulp.task('build.dev', function (done) {
  runSequence('clean.dist', 'build.lib.dev', 'build.app.dev', done);
});


// --------------
// Build prod.
// To be implemented (https://github.com/mgechev/angular2-seed/issues/58)


// --------------
// Test.
gulp.task('build.test', tasks('build.test'));
gulp.task('karma.start', ['build.test'], tasks('karma.start'));
gulp.task('test.dev', ['build.test'], tasks('test.dev'));
gulp.task('test', ['karma.start'], tasks('test'));


// --------------
// Post install
gulp.task('postinstall', function (done) {
  runSequence('clean', done);
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
    livereload();
});
