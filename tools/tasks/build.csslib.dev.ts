import {join} from 'path';
import {PATH} from '../config';

export = function buildCSSDev(gulp, plugins, option) {
  return function () {
    return gulp.src(PATH.src.csslib)
      .pipe(gulp.dest(join(PATH.dest.dev.css)));
  };
}
