import {join} from 'path';
import {PATH, APP_SRC} from '../config';
import {templateLocals, tsProjectFn} from '../utils';

export = function buildJSDev(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
                join(PATH.src.all, '**/*.ts'),
                '!' + join(PATH.src.all, '**/*_spec.ts')
              ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template({ base: APP_SRC }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(PATH.dest.dev.all));
  };
};
