import * as gulp from 'gulp';
import { join } from 'path';

import Config from '../../config';

/**
 * This sample task copies all TypeScript files over to the appropriate `dist/dev|prod|test` directory, depending on the
 * current application environment.
 */
export = () => {
  return gulp.src(join(Config.APP_SRC, '**/*.ts'))
    .pipe(gulp.dest(Config.APP_DEST));
};
