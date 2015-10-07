import path = require('path');
import utils = require('../utils');
import CONFIG = require('../workflow.config');

const PATH = CONFIG.PATH;
const join = path.join;

export = function (gulp, plugins) {
  return function () {
    var tsProject = utils.tsProject(plugins);

    var result = gulp.src(
      [
        join(PATH.src.all, '**/*ts'),
        '!' + join(PATH.src.all, '**/*_spec.ts')
      ])
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template({ base: CONFIG.APP_SRC }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.template(utils.templateLocals()))
      .pipe(gulp.dest(PATH.dest.dev.all));
  };
};
