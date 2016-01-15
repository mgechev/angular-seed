import {join} from 'path';
import {APP_SRC, APP_DEST} from '../config';

export = function buildAssetsDev(gulp, plugins) {
  // TODO There should be more elegant to prevent empty directories from copying
  let es = require('event-stream');
  var onlyDirs = function (es) {
    return es.map(function (file, cb) {
      if (file.stat.isFile()) {
        return cb(null, file);
      } else {
        return cb();
      }
    });
  };
  return function () {
    return gulp.src([
        join(APP_SRC, '**'),
        '!' + join(APP_SRC, '**', '*.ts'),
        '!' + join(APP_SRC, '**', '*.css'),
        '!' + join(APP_SRC, '**', '*.html'),
      ])
      .pipe(onlyDirs(es))
      .pipe(gulp.dest(APP_DEST));
  };
}
