import * as gulp from 'gulp';
import * as htmlmin from 'gulp-htmlmin';
import { join } from 'path';
import Config from '../../config';

/**
 * Minifies the final index.html file.
 */
export = () => {
  return gulp.src([join(Config.APP_DEST, 'index.html')])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true
    }))
    .pipe(gulp.dest(Config.APP_DEST));
};
