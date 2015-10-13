import {PATH} from '../workflow.config';

export = function task(gulp) {
  return function () {
    return gulp.src(
      [].concat(
        PATH.src.lib_inject,
        PATH.src.lib_copy_only
      ))
      .pipe(gulp.dest(PATH.dest.dev.lib));
  };
}
