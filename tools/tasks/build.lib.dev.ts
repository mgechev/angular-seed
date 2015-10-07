import CONFIG = require('../workflow.config');
const PATH = CONFIG.PATH;

export = function (gulp) {
  return function () {
    return gulp.src(
      [].concat(
        PATH.src.lib_inject,
        PATH.src.lib_copy_only
      ))
      .pipe(gulp.dest(PATH.dest.dev.lib));
  };
};
