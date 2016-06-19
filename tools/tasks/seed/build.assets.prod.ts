import * as gulp from 'gulp';
import { join } from 'path';
import * as strip from 'gulp-strip-comments';
import * as gulpIf from 'gulp-if';

import { APP_DEST, APP_SRC, ASSETS_SRC, TEMP_FILES, ENABLE_JSON_COMMENT_STRIPPING } from '../../config';

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
    join(APP_SRC, '**'),
    '!' + join(APP_SRC, '**', '*.ts'),
    '!' + join(APP_SRC, '**', '*.css'),
    '!' + join(APP_SRC, '**', '*.html'),
    '!' + join(APP_SRC, '**', '*.scss'),
    '!' + join(ASSETS_SRC, '**', '*.js')
  ].concat(TEMP_FILES.map((p) => { return '!' + p; })))
    .pipe(onlyDirs(es))
    .pipe(gulpIf((file) => ENABLE_JSON_COMMENT_STRIPPING && file.path.match(/.*.json$/), strip()))
    .pipe(gulp.dest(APP_DEST));
};
