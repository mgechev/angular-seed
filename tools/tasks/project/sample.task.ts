import * as gulp from 'gulp';
import { join } from 'path';

import { APP_DEST, APP_SRC } from '../../config';

/**
 * Sample tasks
 *
 */

export = () => {
  return gulp.src(join(APP_SRC, '**/*.ts'))
    .pipe(gulp.dest(APP_DEST));
};
