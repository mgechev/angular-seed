import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import { join } from 'path';

import Config from '../../config';

const plugins = <any>gulpLoadPlugins();

const getTask = (target: string, destDir: string, mangle : boolean) => {
  return gulp.src(join(destDir, target))
    .pipe(plugins.uglify({
      compress: true,
      mangle: mangle
    }))
    .pipe(gulp.dest(destDir));
};

export = () => {
  return merge(
    getTask(Config.JS_PROD_APP_BUNDLE, Config.JS_DEST, false),
    getTask(Config.JS_PROD_SHIMS_BUNDLE, Config.JS_DEST, true)
  );
};
