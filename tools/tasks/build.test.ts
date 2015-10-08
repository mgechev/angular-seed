import {tsProject} from '../utils';
import {PATH, APP_SRC} from '../workflow.config';

export = function (gulp, plugins) {
  return function () {
    let config = tsProject(plugins);
    let result = gulp.src(
      [
        './app/**/*.ts',
        '!./app/init.ts'
      ])
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template({ base: APP_SRC }))
      .pipe(plugins.typescript(config));

    return result.js
      .pipe(gulp.dest(PATH.dest.test));
  };
};
