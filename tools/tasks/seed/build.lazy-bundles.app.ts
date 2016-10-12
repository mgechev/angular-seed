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

const bundleMain = () => {
  let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  return builder
    .buildStatic(join(Config.TMP_DIR, Config.BOOTSTRAP_PROD_MODULE),
      join(Config.JS_DEST, Config.JS_PROD_APP_BUNDLE),
      BUNDLER_OPTIONS);
};

const bundleModule = (config: Bundle[], bundle: Bundle) => {
  const rest = config.filter(b => b !== bundle);
  let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  let all = join(Config.TMP_DIR, Config.BOOTSTRAP_DIR);
  let restModules = rest.map(b => {
    return join(Config.TMP_DIR, Config.BOOTSTRAP_DIR, b.path, b.module);
  }).join(' + ');
  let bootstrap = join(Config.TMP_DIR, Config.BOOTSTRAP_DIR, bundle.path, bundle.module);
  let bootstrapDir = join(Config.TMP_DIR, Config.BOOTSTRAP_DIR, bundle.path);
  let expression = `${bootstrap} - (${all}/**/*.js - ${bootstrapDir}/**/*.js)`;
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
    .then(() => Promise.all(config.map(bundleModule.bind(null, config))))
    .then(() => done())
    .catch((e: any) => done(e));
};

