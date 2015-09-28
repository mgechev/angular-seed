"use strict";

var path = require('path');
var join = path.join;
var CONFIG = require('../workflow.config');
var utils = require('../utils');

module.exports = function (gulp, plugins) {

  return function () {
    var tsProject = utils.tsProject(plugins);

    var result = gulp.src(
      [
        join(CONFIG.PATH.src.all, '**/*ts'),
        '!' + join(CONFIG.PATH.src.all, '**/*_spec.ts')
      ])

      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template({base: 'app'}))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.template(utils.templateLocals()))
      .pipe(gulp.dest(CONFIG.PATH.dest.dev.all));
  };
};

