var path = require('path');
var join = path.join;
var CONFIG = require('../workflow.config');

export = function (gulp, plugins) {
  return function () {
    return gulp.src(
      [
        join(CONFIG.PATH.src.all, '**/*.ts'),
        '!' + join(CONFIG.PATH.src.all, 'typings/**/*.ts')
      ])
      .pipe(plugins.tslint())
      .pipe(plugins.tslint.report(plugins.tslintStylish, {
        emitError: false,
        sort: true,
        bell: true
      }));
  };
};
