import {join} from 'path';
import {APP_SRC, TEST_DEST} from '../config';
import {tsProjectFn} from '../utils';

export = function buildTest(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
                join(APP_SRC, '**/*.ts'),
                '!' + join(APP_SRC, 'bootstrap.ts')
              ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template({ base: APP_SRC }))
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(gulp.dest(TEST_DEST));
  };
};
