import {join} from 'path';
import {TOOLS_DIR} from '../../config';
import {templateLocals, tsProjectFn} from '../../utils';

export = function buildJSDev(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
      'typings/main.d.ts',
      'tools/manual_typings/**/*.d.ts',
      join(TOOLS_DIR, '**/*.ts')
    ];
    let result = gulp.src(src, { base: './' })
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest('./'));
  };
};
