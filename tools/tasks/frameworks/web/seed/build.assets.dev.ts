import * as gulp from 'gulp';
import { join } from 'path';

import { WEB_APP_DEST, WEB_APP_SRC, WEB_TEMP_FILES } from '../../../../config';

/**
 * Executes the build process, copying the assets located in `src/client/assets` over to the appropiate
 * `dist/dev/assets` directory.
 */
export = () => {
  let paths: string[] = [
    join(WEB_APP_SRC, '**'),
    '!' + join(WEB_APP_SRC, '**', '*.ts'),
    '!' + join(WEB_APP_SRC, '**', '*.scss'),
    '!' + join(WEB_APP_SRC, '*.js'), // Do not copy `karma.conf.js`, `protractor.conf.js`, `test-main.js`
    '!' + join(WEB_APP_SRC, '*.json') // Do not copy `tsconfig.json`
  ].concat(WEB_TEMP_FILES.map((p: any) => { return '!' + p; }));

  return gulp.src(paths)
    .pipe(gulp.dest(WEB_APP_DEST));
};
