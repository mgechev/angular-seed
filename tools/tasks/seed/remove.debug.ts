import * as gulp from 'gulp';
import { join } from 'path';
import Config from '../../config';
const removeDebug = require('gulp-remove-logging');

/**
 * Remove all debug statements from distribution
 */
export = () => {
  return gulp.src([join(Config.TMP_DIR, '**/*.js')])
    .pipe(removeDebug())
    .pipe(gulp.dest(Config.TMP_DIR));
};
