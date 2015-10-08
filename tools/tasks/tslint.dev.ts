import {join} from 'path';
import {PATH} from '../workflow.config';

export = function (gulp, plugins) {
  return function () {
    return gulp.src(
      [
        join(PATH.src.all, '**/*.ts'),
        '!' + join(PATH.src.all, '**/*.d.ts')
      ])
      .pipe(plugins.tslint())
      .pipe(plugins.tslint.report(plugins.tslintStylish, {
        emitError: false,
        sort: true,
        bell: true
      }));
  };
};
