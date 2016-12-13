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

/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */

export = (done : any) => {

  let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  let mainBundle = join(Config.TMP_DIR, Config.BOOTSTRAP_PROD_MODULE);
  let bootstrapDir = join(Config.TMP_DIR, Config.BOOTSTRAP_DIR);

  let src = join(bootstrapDir, '&*/*module.js');

  return gulp.src(src)
    .pipe(plugins.flatmap((stream: any, file: any) => {
      let fileRelative: string = join(Config.BOOTSTRAP_DIR,file.relative);
      if (!fileRelative.includes('routing')) {
         console.log('file', file.relative);
         let lazyBundle = `${join(Config.TMP_DIR,fileRelative)} - ${mainBundle}`;
         builder.buildStatic(lazyBundle,join(Config.APP_DEST, fileRelative),
         BUNDLER_OPTIONS)
               .then(() => util.log('Builded Lazy Module '+ lazyBundle))
              .catch((err: any) => done(err));

      }
      return stream;
    }));
};


