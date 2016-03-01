import {join} from 'path';
import {
  APP_SRC,
  TMP_DIR
} from '../config';

export = function copyJSProd(gulp, plugins) {
  return function () {

    let src = [
      join(APP_SRC, '**/*.ts'),
      '!' + join(APP_SRC, '**/*.spec.ts'),
      '!' + join(APP_SRC, '**/*.e2e.ts')
    ];
    return gulp.src(src)
      .pipe(gulp.dest(TMP_DIR));
  };
};
