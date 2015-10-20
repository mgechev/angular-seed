import {join} from 'path';
import {PATH} from '../config';

export = function buildFonts(gulp, plugins, option) {
  return function () {
    return gulp.src(PATH.src.fonts)
      .pipe(gulp.dest(join(PATH.dest.dev.fonts)));
  };
}
