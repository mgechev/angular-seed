'use strict';

var gulp = require('gulp');
var traceur = require('gulp-traceur');

gulp.task('build', function () {
  return gulp.src('./js/**/*.js')
    .pipe(traceur({
      sourceMaps: 'inline',
      modules: 'instantiate',
      annotations: true,
      memberVariables: true,
      typeAssertions: true,
      typeAssertionModule: './lib/rtts_assert',
      types: true
    }))
    .pipe(gulp.dest('./dev'));
});

gulp.task('watch', function () {
  gulp.watch('./js/**', ['build']);
});
