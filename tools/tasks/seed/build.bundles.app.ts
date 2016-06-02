import { join } from 'path';
import * as Builder from 'systemjs-builder';

import {
  BOOTSTRAP_MODULE,
  JS_PROD_DEPENDENCIES_BUNDLE,
  JS_PROD_APP_BUNDLE,
  JS_DEST,
  SYSTEM_BUILDER_CONFIG,
  TMP_DIR
} from '../../config';

const BUNDLER_OPTIONS = {
  format: 'cjs',
  minify: true,
  mangle: false
};

/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */
export = (done: any) => {

  let builder = new Builder(SYSTEM_BUILDER_CONFIG);
  builder.bundle(join(TMP_DIR, BOOTSTRAP_MODULE) + ' - [' + join(TMP_DIR, 'app/**/*') + ']',
    join(JS_DEST, JS_PROD_DEPENDENCIES_BUNDLE), BUNDLER_OPTIONS)
    .then(() => builder
      .bundle(join(TMP_DIR, BOOTSTRAP_MODULE) + ' - ' +  join(JS_DEST, JS_PROD_DEPENDENCIES_BUNDLE),
        join(JS_DEST, JS_PROD_APP_BUNDLE),
        BUNDLER_OPTIONS)
      .then(() => done())
      .catch(err => done(err))
    )
    .catch(err => done(err));

};
