import path = require('path');
import CONFIG = require('../workflow.config');
import utils = require('../utils');

const PATH = CONFIG.PATH;
const join = path.join;

export = function (gulp, plugins) {
  return function () {
    let target = gulp.src(utils.injectableDevAssetsRef(), { read: false });
    return gulp.src(join(PATH.src.all, 'index.html'))
      .pipe(plugins.inject(target, {
        transform: utils.transformPath(plugins, 'dev')
      }))
      .pipe(plugins.template(utils.templateLocals()))
      .pipe(gulp.dest(PATH.dest.dev.all));
  };
};
