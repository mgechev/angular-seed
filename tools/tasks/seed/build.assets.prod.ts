import * as gulp from 'gulp';
import { join } from 'path';

import Config from '../../config';

// TODO There should be more elegant to prevent empty directories from copying
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
 * Executes the build process, copying the assets located in `src/client` over to the appropriate
 * `dist/prod` directory.
 */
export = () => {
  let es: any = require('event-stream');
  return gulp.src([
    join(Config.APP_SRC, '**'),
    join(Config.NPM_BASE, '@angular', 'service-worker', 'bundles', 'worker-basic.min.js'),
    '!' + join(Config.APP_SRC, 'tsconfig.json'),
    '!' + join(Config.APP_SRC, '**', '*.ts'),
    '!' + join(Config.APP_SRC, '**', '*.css'),
    '!' + join(Config.APP_SRC, '**', '*.html'),
    '!' + join(Config.APP_SRC, '**', '*.scss'),
    '!' + join(Config.APP_SRC, '**', '*.sass'),
    '!' + join(Config.ASSETS_SRC, '**', '*.js')
  ].concat(Config.TEMP_FILES.map((p) => { return '!' + p; })))
    .pipe(onlyDirs(es))
    .pipe(gulp.dest(Config.APP_DEST));
};
