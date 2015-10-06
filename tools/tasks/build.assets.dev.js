"use strict";

var path = require('path');
var join = path.join;
var PATH = require('../workflow.config').PATH;

module.exports = function (gulp) {
  return function () {
    return gulp.src([join(PATH.src.all, '**/*.html'), join(PATH.src.all, '**/*.css'), join(PATH.src.all, '**/assets/**/**/*.*')])
      .pipe(gulp.dest(PATH.dest.dev.all));
  };
};
