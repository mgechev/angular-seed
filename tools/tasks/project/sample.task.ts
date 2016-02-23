import {join} from 'path';
import {CONFIG} from '../../config';

/**
 * Sample tasks
 *
 */

export = function sampleTask(gulp, plugins) {
  return function () {
    return gulp.src(join(CONFIG.APP_SRC, '**/*.ts'))
      .pipe(gulp.dest(CONFIG.APP_DEST));
  };
}
