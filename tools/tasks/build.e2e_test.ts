import {join} from 'path';
import {APP_SRC, TEST_SRC, TEST_E2E_DEST} from '../config';
import {templateLocals, tsProjectFn} from '../utils';

export = function buildE2eTest(gulp, plugins) {
  let tsProject = tsProjectFn(plugins);

  return function () {
    let src = [
      'typings/browser.d.ts',
      join(APP_SRC, '**/*.ts'),
      join(TEST_SRC, '**/*.e2e.ts'),
      '!' + join(TEST_SRC, '**/*.spec.ts')
    ];
    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(TEST_E2E_DEST));
  };
};
