import utils = require('../utils');
import CONFIG = require('../workflow.config');

export = function (gulp, plugins) {
  return function () {
    let tsProject = utils.tsProject(plugins);
    let result = gulp.src(
      [
        './app/**/*.ts',
        '!./app/init.ts'
      ])
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template({base: CONFIG.APP_SRC}))
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(gulp.dest('./test'));
  };
};
