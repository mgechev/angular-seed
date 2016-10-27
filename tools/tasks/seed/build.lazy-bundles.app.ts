import { appendFileSync } from 'fs';
import { join } from 'path';
import * as Builder from 'systemjs-builder';

import Config from '../../config';

const BUNDLER_OPTIONS = {
  format: 'cjs',
  minify: true,
  mangle: false
};

interface Bundle {
  path: string;
  module: string;
}

const normalizeConfig = (bundles: any[]) => {
  return bundles.map(b => {
    if (typeof b === 'string') {
      b = { path: b };
    }
    if (!b.module) {
      b.module = b.path.split('\/').pop() + '.module.js';
    } else {
      b.module += '.js';
    }
    return b;
  });
};

const addExtensions = `
System.config({ defaultJSExtensions: true });
(function () {
  Object.keys(System.defined).forEach(function (m) {
    if (!/\.js$/.test(m)) {
      System.defined[m + '.js'] = System.defined[m];
    }
  });
}());
`;

const bundleMain = () => {
  const builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  const mainpath = join(Config.TMP_DIR, Config.BOOTSTRAP_PROD_MODULE);
  const outpath = join(Config.JS_DEST, Config.JS_PROD_APP_BUNDLE);
  return builder
    .bundle(mainpath,
      outpath,
      Object.assign({ format: 'umd', BUNDLER_OPTIONS }))
      .then((res: any) => {
        appendFileSync(outpath, `System.import('${mainpath}.js');${addExtensions}`);
        return res.modules;
      });
};

const bundleModule = (config: Bundle[], exclude: string[], bundle: Bundle) => {
  let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  let all = join(Config.TMP_DIR, Config.BOOTSTRAP_DIR);
  let bootstrap = join(Config.TMP_DIR, Config.BOOTSTRAP_DIR, bundle.path, bundle.module);
  let bootstrapDir = join(Config.TMP_DIR, Config.BOOTSTRAP_DIR, bundle.path);
  let expression = `${bootstrap} - (${all}/**/*.js - ${bootstrapDir}/**/*.js) - ${exclude.join(' - ')}`;
  console.log('bundling', expression);
  return builder
    .buildStatic(
      expression,
      join(Config.JS_DEST, '..', Config.BOOTSTRAP_DIR, bundle.path, bundle.module),
      Object.assign({}, BUNDLER_OPTIONS, { format: 'umd' }))
      .then((res: any) => {
        console.log(res.modules);
        console.log('Bundled', bundle.path);
        return res;
      });
};

/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */
export = (done: any) => {
  const config = normalizeConfig(Config.BUNDLES);
  bundleMain()
    .then((bundled: string[]) => Promise.all(config.map(bundleModule.bind(null, config, bundled))))
    .then(() => done())
    .catch((e: any) => done(e));
};

