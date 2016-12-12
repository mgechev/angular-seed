import { join } from 'path';
import * as Builder from 'systemjs-builder';

import Config from '../../config';

const BUNDLER_OPTIONS = {
  format: 'umd',
  minify: true,
  mangle: false
};

/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */
export = (done: any) => {
  let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  let mainBundle  = join(Config.TMP_DIR, Config.BOOTSTRAP_PROD_MODULE);
  let lazyBundle = `${join(Config.TMP_DIR+'/app/+about/lazy-about.module')} - ${mainBundle}`;
  builder.buildStatic(lazyBundle,join(Config.APP_DEST+'/app/+about','lazy-about.module.js'),
    BUNDLER_OPTIONS)
    .then(() => done())
    .catch((err: any) => done(err));
};
