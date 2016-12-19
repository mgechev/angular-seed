import { join } from 'path';
import * as Builder from 'systemjs-builder';
import { writeFileSync } from 'fs';

import Config from '../../config';
import { systemjsConfigStart, TRACEUR_RUNTIME_SRC, systemjsImportStart } from '../../utils/seed/compile.utils';

const BUNDLER_OPTIONS = {
  format: 'cjs',
  minify: true,
  mangle: false,
  encodeNames : false
};

/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */
export = (done: any) => {
  let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  let source = `${Config.TMP_DIR}/${Config.BOOTSTRAP_PROD_MODULE}`;
  let outpath = join(Config.JS_DEST, Config.JS_PROD_APP_BUNDLE);
  builder
    .bundle(source, outpath, BUNDLER_OPTIONS)
    .then((output) => {

       writeFileSync(outpath, `${TRACEUR_RUNTIME_SRC} ${systemjsConfigStart(Config)}
          ${output.source} ${systemjsImportStart('main')}`);

      done();
    })
    .catch((err: any) => done(err));
};
