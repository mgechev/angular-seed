export = function (gulp, plugins) {
  return function () {
    gulp.task('test', ['karma.start'], function () {
      if (!process.env.TRAVIS) {
        plugins.watch('./app/**', () => gulp.start('karma.start'));
      }
    });
  };
};
