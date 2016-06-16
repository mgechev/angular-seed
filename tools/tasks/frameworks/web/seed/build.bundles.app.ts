import { join } from 'path';
import * as Builder from 'systemjs-builder';

import {
  WEB_BOOTSTRAP_MODULE,
  WEB_JS_PROD_APP_BUNDLE,
  WEB_JS_DEST,
  SYSTEM_BUILDER_CONFIG,
  WEB_TMP_DIR
} from '../../../../config';

const BUNDLER_OPTIONS = {
  format: 'cjs',
  minify: true,
  mangle: false
};

/**
 * Executes the build process, bundlig the JavaScript files using the SystemJS builder.
 */
export = (done: any) => {
  let builder = new Builder(SYSTEM_BUILDER_CONFIG);
  builder
    .buildStatic(join(WEB_TMP_DIR, WEB_BOOTSTRAP_MODULE),
                 join(WEB_JS_DEST, WEB_JS_PROD_APP_BUNDLE),
                 BUNDLER_OPTIONS)
    .then(() => done())
    .catch(err => done(err));
};
