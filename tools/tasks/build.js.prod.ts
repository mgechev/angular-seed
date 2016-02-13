import {join} from 'path';
import {APP_SRC, TEST_SRC, TMP_DIR} from '../config';
import {templateLocals, tsProjectFn} from '../utils';

export = function buildJSProd(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
      'typings/browser.d.ts',
      join(APP_SRC, '**/*.ts'),
      '!' + join(TEST_SRC, '**/*.spec.ts'),
      '!' + join(TEST_SRC, '**/*.e2e.ts')
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
