import {join} from 'path';
import {PATH} from '../config';

export = function tslint(gulp, plugins) {
  return function () {
    let src = [
                join(PATH.src.all, '**/*.ts'),
                '!' + join(PATH.src.all, '**/*.d.ts'),
                join(PATH.tools, '**/*.ts'),
                '!' + join(PATH.tools, '**/*.d.ts')
              ];

    return gulp.src(src)
      .pipe(plugins.tslint())
      .pipe(plugins.tslint.report(plugins.tslintStylish, {
        emitError: false,
        sort: true,
        bell: true
      }));
  };
};
