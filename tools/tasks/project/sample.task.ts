import * as gulp from 'gulp';
import { join } from 'path';

import { APP_DEST, APP_SRC } from '../../config';

/**
 * This sample task copies all TypeScript files over to the appropiate `dist/dev|prod|test` directory, depending on the
 * current application environment.
 */
export = () => {
  return gulp.src(join(APP_SRC, '**/*.ts'))
    .pipe(gulp.dest(APP_DEST));
};
