import * as merge from 'merge-stream';
import {join} from 'path';
import {APP_SRC, TMP_DIR} from '../config';

const HTML_MINIFIER_OPTS = { empty: true };

export = function buildJSDev(gulp, plugins) {
  return function () {

    return merge(minifyHtml(), minifyCss());

    function minifyHtml() {
      return gulp.src(join(APP_SRC, '**/*.html'))
        .pipe(plugins.minifyHtml(HTML_MINIFIER_OPTS))
        .pipe(gulp.dest(TMP_DIR));
    }

    function minifyCss() {
      return gulp.src(join(APP_SRC, '**/*.css'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(TMP_DIR));
    }
  };
};
