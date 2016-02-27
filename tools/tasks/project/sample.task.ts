import {join} from 'path';
import {APP_SRC, APP_DEST} from '../../config';

/**
 * Sample tasks
 *
 */

export = function sampleTask(gulp, plugins) {
  return function () {
    return gulp.src(join(APP_SRC, '**/*.ts'))
      .pipe(gulp.dest(APP_DEST));
  };
}
