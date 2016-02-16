import {join} from 'path';
import * as Builder from 'systemjs-builder';
import {
  BOOTSTRAP_MODULE,
  JS_PROD_APP_BUNDLE,
  JS_DEST,
  SYSTEM_BUILDER_CONFIG,
  TMP_DIR
} from '../config';

const BUNDLER_OPTIONS = {
  format: 'cjs',
  minify: true,
  mangle: false
};

export = function bundles(gulp, plugins) {
  return function (done) {
    let builder = new Builder(SYSTEM_BUILDER_CONFIG);
    builder
      .buildStatic(join(TMP_DIR, BOOTSTRAP_MODULE),
                   join(JS_DEST, JS_PROD_APP_BUNDLE),
                   BUNDLER_OPTIONS)
      .then(() => done());
  };
};
