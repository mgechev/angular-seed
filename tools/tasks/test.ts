import {join} from 'path';
import {PATH} from '../workflow.config';

export = function test(gulp, plugins) {
  return function () {
    gulp.task('test', ['karma.start'], function () {
      if (!process.env.TRAVIS) {
        plugins.watch(join(PATH.src.all, '**'), () => gulp.start('karma.start'));
      }
    });
  };
}
