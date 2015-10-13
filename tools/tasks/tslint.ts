import {join} from 'path';
import {PATH} from '../workflow.config';

export = function task(gulp, plugins) {
  return function () {
    return gulp.src([
        join(PATH.src.all, '**/*.ts'),
        join(PATH.src.all, '../gulpfile.ts'),
        join(PATH.src.all, '../tools/**/*.ts'),
        '!' + join(PATH.src.all, '**/*.d.ts'),
        '!' + join(PATH.src.all, '../tools/**/*.d.ts')
      ])
      .pipe(plugins.tslint())
      .pipe(plugins.tslint.report(plugins.tslintStylish, {
        emitError: false,
        sort: true,
        bell: true
      }));
  };
}
