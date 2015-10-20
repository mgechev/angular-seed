import {join} from 'path';
import {PATH, APP_SRC} from '../config';
import {tsProjectFn} from '../utils';

export = function buildTest(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
                join(PATH.src.all, '**/*.ts'),
                '!' + join(PATH.src.all, 'bootstrap.ts')
              ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template({ base: APP_SRC }))
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(gulp.dest(PATH.dest.test));
  };
};
