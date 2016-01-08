import * as merge from 'merge-stream';
import {join} from 'path';
import {APP_SRC, TMP_DIR} from '../config';

export = function buildJSDev(gulp, plugins) {
  return function () {

    return merge(minifyHtml(), minifyCss());

    function minifyHtml() {
      return gulp.src(join(APP_SRC, '**/*.html'))
        .pipe(gulp.dest(TMP_DIR));
    }

    function minifyCss() {
      return gulp.src(join(APP_SRC, '**/*.css'))
        .pipe(plugins.cssnano())
        .pipe(gulp.dest(TMP_DIR));
    }
  };
};
