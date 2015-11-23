import {ASSETS_SRC, ASSETS_DEST} from '../config';

export = function buildAssets(gulp, plugins, option) {
  return function () {
    return gulp.src(ASSETS_SRC)
      .pipe(gulp.dest(ASSETS_DEST));
  };
}
