import { join } from 'path';
import * as Builder from 'systemjs-builder';

import {
  JS_PROD_DEPENDENCIES_BUNDLE,
  JS_DEST,
  SYSTEM_BUILDER_CONFIG,
  TMP_DIR,
  LAZY_MODULES
} from '../../config';
import {LazyModule} from '../../config/seed.config.interfaces';

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
  Promise.all<any>(LAZY_MODULES.map((module: LazyModule) => buildModule(module, builder)).values()).then(() => done())
    .catch(err => done(err));

};

function buildModule(lazyModule: LazyModule, builder: Builder) : Promise<any> {
  return builder.bundle(join(TMP_DIR, 'app', lazyModule.src) + ' - ' +  join(JS_DEST, JS_PROD_DEPENDENCIES_BUNDLE),
    join(JS_DEST, lazyModule.dest), BUNDLER_OPTIONS);
}
