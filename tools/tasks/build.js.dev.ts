import {join} from 'path';
import {templateLocals, tsProject} from '../utils';
import {PATH, APP_SRC} from '../workflow.config';

export = function (gulp, plugins) {
  return function () {
    var config = tsProject(plugins);

    var result = gulp.src(
      [
        join(PATH.src.all, '**/*ts'),
        '!' + join(PATH.src.all, '**/*_spec.ts')
      ])
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template({ base: APP_SRC }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(config));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(PATH.dest.dev.all));
  };
};
