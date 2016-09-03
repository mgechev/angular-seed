import * as gulp from 'gulp';
import { join } from 'path';

import { APP_SRC, TMP_DIR } from '../../config';

/**
 * Executes the build task, copying all TypeScript files over to the `dist/tmp` directory.
 */
export = () => {
  return gulp.src([
      join(APP_SRC, '**/*.ts'),
      join(APP_SRC, '**/*.html'),
      join(APP_SRC, '**/*.css'),
      join(APP_SRC, '**/*.json'),
      '!' + join(APP_SRC, '**/*.spec.ts'),
      '!' + join(APP_SRC, '**/*.e2e-spec.ts')
    ])
    .pipe(gulp.dest(TMP_DIR));
};
