'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');
var traceur = require('gulp-traceur');
var NG_PATH = './node_modules/angular2/es6/dev/';
var RTT_PATH = './node_modules/rtts_assert/';

gulp.task('build:ng', shell.task([
    'npm install',
    './es5build.js -d ../../../../lib/angular'
  ], {
    cwd: NG_PATH
  })
);

gulp.task('build:rtts', shell.task([
    'npm install',
    './es6/es5build.js -d ./../../lib/rtts_assert'
  ], {
    cwd: RTT_PATH
  })
);

gulp.task('build:angular', ['build:ng', 'build:rtts']);

gulp.task('build', function () {
  return gulp.src('./js/**/*.js')
    .pipe(traceur({
      sourceMaps: 'inline',
      modules: 'instantiate'
    }))
    .pipe(gulp.dest('./dev'));
});

gulp.task('watch', function () {
  gulp.watch('./js/**', ['build']);
});
