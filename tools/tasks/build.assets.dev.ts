var path = require('path');
var CONFIG = require('../workflow.config');

const PATH = CONFIG.PATH;
const join = path.join;

export = function (gulp) {
  return function () {
    return gulp.src(
      [
        join(PATH.src.all, '**/*.html'),
        join(PATH.src.all, '**/*.css')
      ])
      .pipe(gulp.dest(PATH.dest.dev.all));
  };
};
