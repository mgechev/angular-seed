"use strict";

var path = require('path');
var join = path.join;
var CONFIG = require('../workflow.config');

module.exports = function (gulp, plugins) {
  return function () {
    var results = gulp.src(
      [
        join(CONFIG.PATH.src.all, '**/*.ts'),
        '!' + join(CONFIG.PATH.src.all, 'typings/**/*.ts')
      ]);

    return results
      .pipe(plugins.tslint())
      .pipe(plugins.tslint.report(plugins.tslintStylish, {
        emitError: false,
        sort: true,
        bell: true
      }));
  };
};
