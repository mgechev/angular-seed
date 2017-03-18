import * as gulp from 'gulp';
import { join } from 'path';
import Config from '../../config';

const replace = require('gulp-replace');

/**
 * Executes the build task, copying all TypeScript files over to the `dist/tmp` directory.
 */
export = () => {
  return gulp.src([
      join(Config.APP_SRC, '**/*.ts'),
      join(Config.APP_SRC, '**/*.json'),
      '!' + join(Config.APP_SRC, '**/*.spec.ts'),
      '!' + join(Config.APP_SRC, '**/*.e2e-spec.ts')
    ])
    // import in dev mode: import * as moment from 'moment';
    // import for rollup:  import moment from 'moment';
    // .pipe(replace('import * as moment from \'moment\';', 'import moment from \'moment\';'))
    // .pipe(replace('import * as uuid from \'node-uuid\';', 'import uuid from \'node-uuid\';'))
    .pipe(gulp.dest(Config.TMP_DIR));
};
