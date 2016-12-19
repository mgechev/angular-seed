import { join } from 'path';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as Builder from 'systemjs-builder';
import * as util from 'gulp-util';
import * as path from 'path';
import { existsSync } from 'fs';

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
  let mainBundle = '';

  return gulp.src(Config.LAZY_MATCH_EXPRESSION)
    .pipe(plugins.flatmap((stream: any, file: any) => {
      const ext = path.extname(file.relative);
      let fileRelative: string = slash(join(Config.BOOTSTRAP_DIR, file.relative.replace(ext, '')));
      if (existsSync(file.path.replace(ext,'.ngfactory.js'))) {
        mainBundle = `${Config.TMP_DIR}/${Config.BOOTSTRAP_FACTORY_PROD_MODULE}`;
        fileRelative+='.ngfactory';
      } else {
        mainBundle = `${Config.TMP_DIR}/${Config.BOOTSTRAP_PROD_MODULE}`;
      }
      let lazyBundle = `${slash(join(Config.TMP_DIR, fileRelative))} - ${mainBundle}`;
      util.log('Building lazy bundle', lazyBundle);
      builder.buildStatic(lazyBundle, join(Config.APP_DEST, fileRelative + '.js'),
        BUNDLER_OPTIONS)
        .catch((err: any) => done(err));
      return stream;
    }));
};

