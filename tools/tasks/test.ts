export = function (gulp, plugins) {
  return function () {
    gulp.task('test', ['karma.start'], function () {
      plugins.watch('./app/**', () => gulp.start('karma.start'));
    });
  };
};
