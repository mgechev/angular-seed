import {join} from 'path';
import {APP_SRC, TEST_SRC, APP_DEST} from '../config';
import {templateLocals, tsProjectFn} from '../utils';

export = function buildJSDev(gulp, plugins) {
  let tsProject = tsProjectFn(plugins);

  return function () {
    let src = [
      'typings/browser.d.ts',
      'tools/manual_typings/**/*.d.ts',
      join(APP_SRC, '**/*.ts'),
      '!' + join(TEST_SRC, '**/*.spec.ts'),
      '!' + join(TEST_SRC, '**/*.e2e.ts')
    ];
    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST));
  };
};
