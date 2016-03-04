import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join} from 'path';
import {APP_SRC} from '../../config';
const plugins = <any>gulpLoadPlugins();

export function watch(taskname) {
  return () => {
    plugins.watch(join(APP_SRC, '**/*'),
      () => gulp.start(taskname));
  };
}
