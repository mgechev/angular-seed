"use strict";

var path = require('path');
var join = path.join;
var CONFIG = require('../workflow.config');

module.exports = function (gulp, plugins) {
  return function () {
    var results = gulp.src(
      [
        join(CONFIG.PATH.src.all, '**/*.js'),
        join(CONFIG.PATH.src.all, '../tools/**/*.js'),
        join(CONFIG.PATH.src.all, '../gulpfile.js')
      ]);

    return results
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish', { verbose: true }));
  };
};
