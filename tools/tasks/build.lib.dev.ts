import {PATH} from '../config';

let libs: string[] = [];

export = function buildLibDev(gulp) {
  return function () {
    let src = libs.concat(PATH.src.lib_inject,
                          PATH.src.lib_copy_only);

    return gulp.src(src)
      .pipe(gulp.dest(PATH.dest.dev.lib));
  };
};
