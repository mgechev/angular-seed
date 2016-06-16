import * as gulp from 'gulp';
import { join } from 'path';

import { WEB_APP_DEST, WEB_APP_SRC } from '../../config';

/**
 * This sample task copies all TypeScript files over to the appropiate `dist/dev|prod|test` directory, depending on the
 * current application environment.
 */
export = () => {
  return gulp.src(join(WEB_APP_SRC, '**/*.ts'))
    .pipe(gulp.dest(WEB_APP_DEST));
};
