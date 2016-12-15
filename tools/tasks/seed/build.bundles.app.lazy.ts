import { join } from 'path';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as Builder from 'systemjs-builder';
import * as util from 'gulp-util';

import Config from '../../config';

const BUNDLER_OPTIONS = {
  format: 'umd',
  minify: true,
  mangle: false
};

const plugins = <any>gulpLoadPlugins();
const slash = require('slash');

/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */

export = (done: any) => {

  let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  let mainBundle = `${Config.TMP_DIR}/${Config.BOOTSTRAP_PROD_MODULE}`;

  return gulp.src(Config.LAZY_MATCH_EXPRESSION)
    .pipe(plugins.flatmap((stream: any, file: any) => {
      let fileRelative: string = slash(join(Config.BOOTSTRAP_DIR, file.relative));
      let lazyBundle = `${slash(join(Config.TMP_DIR, fileRelative))} - ${mainBundle}`;
      util.log('Building lazy bundle', lazyBundle);
      builder.buildStatic(lazyBundle, join(Config.APP_DEST, fileRelative),
        BUNDLER_OPTIONS)
        .catch((err: any) => done(err));
      return stream;
    }));
};

