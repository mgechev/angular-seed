import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import { join } from 'path';

import Config from '../../config';

const plugins = <any>gulpLoadPlugins();

const getTask = (target: string, destDir: string, sourceMaps: boolean = false) => {
  return gulp.src(join(destDir, target))
    .pipe(sourceMaps && Config.PRESERVE_SOURCE_MAPS ? plugins.sourcemaps.init({
      loadMaps: true,
      largeFile: true
    }) : plugins.util.noop())
    .pipe(plugins.uglify({
      compress: true,
      mangle: true
    }))
    .pipe(sourceMaps && Config.PRESERVE_SOURCE_MAPS ? plugins.sourcemaps.write('.') : plugins.util.noop())
    .pipe(gulp.dest(destDir));
};

export = () => {
  return merge(
    getTask(Config.JS_PROD_APP_BUNDLE, Config.JS_DEST, true),
    getTask(Config.JS_PROD_SHIMS_BUNDLE, Config.JS_DEST)
  );
};
