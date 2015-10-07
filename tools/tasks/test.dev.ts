export = function (gulp, plugins) {
  return function () {
    plugins.watch('./app/**', () => gulp.start('build.test'));
  };
};
