"use strict";

var utils = require('../utils');

module.exports = function (gulp, plugins) {
  return function () {
    var tsProject = utils.tsProject(plugins);
    var result = gulp.src(['./app/**/*.ts', '!./app/init.ts'])
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template({base: 'app'}))
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(gulp.dest('./test'));
  };
};
