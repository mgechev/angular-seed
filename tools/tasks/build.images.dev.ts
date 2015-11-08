import {join} from 'path';
import {PATH} from '../config';

export = function buildImagesDev(gulp, plugins) {
  return function () {
    return gulp.src([
        join(PATH.src.all, '**/*.png'),
        join(PATH.src.all, '**/*.jpg'),
        join(PATH.src.all, '**/*.svg')
      ])
      .pipe(gulp.dest(PATH.dest.dev.all));
  };
}
