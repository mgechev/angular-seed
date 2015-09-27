"use strict";

var PATH = require('../workflow.config').PATH;

module.exports = function (gulp, plugins) {

  return function () {
    return gulp.src(PATH.src.lib)
      .pipe(gulp.dest(PATH.dest.dev.lib));
  };
};