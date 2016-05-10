import * as gulp from 'gulp';
import { join } from 'path';

import { APP_DEST, APP_SRC, TEMP_FILES } from '../../config';

export = () => {
  let paths: string[] = [
    join(APP_SRC, '**'),
    '!' + join(APP_SRC, '**', '*.ts')
  ].concat(TEMP_FILES.map((p) => { return '!' + p; }));

  return gulp.src(paths)
    .pipe(gulp.dest(APP_DEST));
};
