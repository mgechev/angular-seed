import {join} from 'path';
import {PATH} from '../config';

export = function buildAssets(gulp, plugins, option) {
  return function () {
    return gulp.src(PATH.src.assets)
      .pipe(gulp.dest(join(PATH.dest.dev.assets)));
  };
}
