import {join} from 'path';
import {APP_SRC, APP_DEST} from '../config';

export = function buildImagesDev(gulp, plugins) {
  return function () {
    return gulp.src([
        join(APP_SRC, '**/*.gif'),
        join(APP_SRC, '**/*.jpg'),
        join(APP_SRC, '**/*.png'),
        join(APP_SRC, '**/*.svg'),
        join(APP_SRC, '**/*.css'),
        join(APP_SRC, '**/*.html')
      ])
      .pipe(gulp.dest(APP_DEST));
  };
}
