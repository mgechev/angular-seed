import {join} from 'path';
import {PATH} from '../workflow.config';

export = function (gulp, plugins) {
  return function () {
    return gulp.src(
      [
        join(PATH.src.all, '**/*.js'),
        join(PATH.src.all, '../tools/**/*.js'),
        join(PATH.src.all, '../gulpfile.js')
      ])
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish', { verbose: true }));
  };
};
