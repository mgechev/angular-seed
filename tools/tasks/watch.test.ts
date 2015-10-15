import {join} from 'path';
import {APP_SRC} from '../config';

export = function watchTest(gulp, plugins) {
  return function () {
    plugins.watch(join(APP_SRC, '**/*.ts'), () => gulp.start('build.test'));
  };
};
