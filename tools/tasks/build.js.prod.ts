import {join} from 'path';
import {APP_SRC, TMP_DIR} from '../config';
import {templateLocals, tsProjectFn} from '../utils';

export = function buildJSDev(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
                join(APP_SRC, '**/*.ts'),
                '!' + join(APP_SRC, '**/*_spec.ts')
              ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template({ base: TMP_DIR }))
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(TMP_DIR));
  };
};
