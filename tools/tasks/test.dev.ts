import {join} from 'path';
import {PATH} from '../workflow.config';

export = function task(gulp, plugins) {
  return function () {
    plugins.watch(join(PATH.src.all, '**'), () => gulp.start('build.test'));
  };
}
