"use strict";

module.exports = function (gulp, plugins) {
  return function () {
    plugins.watch('./app/**', function () {
      gulp.start('build.test');
    });
  };
};
