import * as gulp from 'gulp';
import { join } from 'path';

import { WEB_APP_DEST, WEB_APP_SRC, WEB_TEMP_FILES, WEB_ASSETS_SRC } from '../../../../config';

// TODO There should be more elegant to prevent empty directories from copying
let es: any = require('event-stream');
var onlyDirs = function (es: any) {
  return es.map(function (file: any, cb: any) {
    if (file.stat.isFile()) {
      return cb(null, file);
    } else {
      return cb();
    }
  });
};

/**
 * Executes the build process, copying the assets located in `src/client/assets` over to the appropiate
 * `dist/prod/assets` directory.
 */
export = () => {
  return gulp.src([
    join(WEB_APP_SRC, '**'),
    '!' + join(WEB_APP_SRC, '**', '*.ts'),
    '!' + join(WEB_APP_SRC, '**', '*.css'),
    '!' + join(WEB_APP_SRC, '**', '*.html'),
    '!' + join(WEB_APP_SRC, '**', '*.scss'),
    '!' + join(WEB_APP_SRC, '*.js'), // Do not copy `karma.conf.js`, `protractor.conf.js`, `test-main.js`
    '!' + join(WEB_APP_SRC, '*.json'), // Do not copy `tsconfig.json`
    '!' + join(WEB_ASSETS_SRC, '**', '*.js')
  ].concat(WEB_TEMP_FILES.map((p: any) => { return '!' + p; })))
    .pipe(onlyDirs(es))
    .pipe(gulp.dest(WEB_APP_DEST));
};
