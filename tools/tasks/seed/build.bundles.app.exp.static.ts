import { join } from 'path';
import * as Builder from 'systemjs-builder';

import Config from '../../config';

const BUNDLER_OPTIONS = {
  format: 'cjs',
  minify: false,
  mangle: false,
  encodeNames:false
};

const SYSTEM_BUILDER_CONFIG: any = {
    defaultJSExtensions: true,
    base: Config.PROJECT_ROOT,
    paths: {
      // Note that for multiple apps this configuration need to be updated
      // You will have to include entries for each individual application in
      // `src/client`.
      [`${Config.TMP_DIR}/${Config.BOOTSTRAP_DIR}/*`]: `${Config.TMP_DIR}/${Config.BOOTSTRAP_DIR}/*`,
      'dist/tmp/node_modules/*': 'dist/tmp/node_modules/*',
      'node_modules/*': 'node_modules/*',
      '*': 'node_modules/*',
      '@angular/common': 'node_modules/@angular/common/index.js',
      '@angular/compiler': 'node_modules/@angular/compiler/index.js',
      '@angular/core': 'node_modules/@angular/core/index.js',
      '@angular/forms': 'node_modules/@angular/forms/index.js',
      '@angular/http': 'node_modules/@angular/http/index.js',
      '@angular/platform-browser': 'node_modules/@angular/platform-browser/index.js',
      '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/index.js',
      '@angular/router': 'node_modules/@angular/router/index.js'
    },
    packages: {
      rxjs: {
        defaultExtension: 'js'
      }
    }
  };

/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */
export = (done: any) => {
  let builder = new Builder(SYSTEM_BUILDER_CONFIG);
  let source = `${Config.TMP_DIR}/${Config.BOOTSTRAP_FACTORY_PROD_MODULE}`;
  let outpath = join(Config.JS_DEST, Config.JS_PROD_APP_BUNDLE);
  builder
    .buildStatic(source, outpath,  BUNDLER_OPTIONS)
    .then(() =>  done())
    .catch((err: any) => done(err));
};
