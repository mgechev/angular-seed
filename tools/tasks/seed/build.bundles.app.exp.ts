import { join } from 'path';
import * as Builder from 'systemjs-builder';

import Config from '../../config';

const BUNDLER_OPTIONS = {
  format: 'cjs',
  minify: false,
  mangle: false
};

/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */
export = (done: any) => {
  let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  let source = `${Config.TMP_DIR}/${Config.BOOTSTRAP_FACTORY_PROD_MODULE}`;
  let outpath = join(Config.JS_DEST, Config.JS_PROD_APP_BUNDLE);
  builder
    .bundle(source, outpath,  BUNDLER_OPTIONS)
    .then(() => done())
    .catch((err: any) => done(err));
};
