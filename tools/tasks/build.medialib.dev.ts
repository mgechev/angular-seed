import {join} from 'path';
import {PATH} from '../config';

export = function buildMediaDev(gulp, plugins, option) {
  return function () {
    return gulp.src(PATH.src.medialib)
      .pipe(gulp.dest(join(PATH.dest.dev.media)));
  };
}
