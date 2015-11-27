import {join} from 'path';
import {APP_SRC, APP_DEST} from '../config';
import {templateLocals, tsProjectFn} from '../utils';

export = function buildJSDev(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
                join(APP_SRC, '**/*.ts'),
                '!' + join(APP_SRC, '**/*_spec.ts')
              ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      // Won't be required for non-production build after the change
      .pipe(plugins.inlineNg2Template({ base: APP_SRC }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST));
  };
};
