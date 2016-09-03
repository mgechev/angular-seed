import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import { join } from 'path';

import { JS_DEST, JS_PROD_APP_BUNDLE, JS_PROD_SHIMS_BUNDLE } from '../../config';

const plugins = <any>gulpLoadPlugins();

const getTask = (target: string, destDir: string) => {
  return gulp.src(join(destDir, target))
    .pipe(plugins.uglify({
      compress: true,
      mangle: true
    }))
    .pipe(gulp.dest(destDir));
};

export = () => {
  return merge(
    getTask(JS_PROD_APP_BUNDLE, JS_DEST),
    getTask(JS_PROD_SHIMS_BUNDLE, JS_DEST)
  );
};
