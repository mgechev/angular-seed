import * as gulp from 'gulp';
import { join } from 'path';

import { WEB_APP_SRC, WEB_TMP_DIR } from '../../../../config';

/**
 * Executes the build task, copying all TypeScript files over to the `dist/tmp` directory.
 */
export = () => {
  return gulp.src([
      join(WEB_APP_SRC, '**/*.ts'),
      '!' + join(WEB_APP_SRC, '**/*.spec.ts'),
      '!' + join(WEB_APP_SRC, '**/*.e2e-spec.ts')
    ])
    .pipe(gulp.dest(WEB_TMP_DIR));
};
