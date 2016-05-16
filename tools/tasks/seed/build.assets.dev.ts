import * as gulp from 'gulp';
import { join } from 'path';

import { APP_DEST, APP_SRC, TEMP_FILES } from '../../config';

/**
 * Executes the build process, copying the assets located in `src/client/assets`
 * over to the appropiate `dist/dev/assets` directory.
 */
export = () => {
  let paths: string[] = [
    join(APP_SRC, '**'),
    '!' + join(APP_SRC, '**', '*.ts')
  ].concat(TEMP_FILES.map((p) => { return '!' + p; }));

  return gulp.src(paths)
    .pipe(gulp.dest(APP_DEST));
};
