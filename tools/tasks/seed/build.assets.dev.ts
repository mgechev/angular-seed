import * as gulp from 'gulp';
import { join } from 'path';
import * as strip from 'gulp-strip-comments';
import * as gulpIf from 'gulp-if';

import { APP_DEST, APP_SRC, TEMP_FILES, ENABLE_JSON_COMMENT_STRIPPING } from '../../config';

/**
 * Executes the build process, copying the assets located in `src/client/assets` over to the appropiate
 * `dist/dev/assets` directory.
 */
export = () => {
  let paths: string[] = [
    join(APP_SRC, '**'),
    '!' + join(APP_SRC, '**', '*.ts'),
    '!' + join(APP_SRC, '**', '*.scss')
  ].concat(TEMP_FILES.map((p) => { return '!' + p; }));

  return gulp.src(paths)
    .pipe(gulpIf((file) => ENABLE_JSON_COMMENT_STRIPPING && file.path.match(/.*.json$/), strip()))
    .pipe(gulp.dest(APP_DEST));
};
