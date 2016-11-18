import { appendFileSync } from 'fs';
import { join } from 'path';
import * as Builder from 'systemjs-builder';

import Config from '../../config';

const BUNDLER_OPTIONS = {
  format: 'cjs',
  minify: false,
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
      b.module = b.path.split('\/').pop() + '.module.ngfactory.js';
    } else {
      b.module += '.ngfactory.js';
    }
    return b;
  });
};

const addExtensions = `
$traceurRuntime = {
  typeof: function (a) {
    return typeof a;
  }
};
System.config({
  defaultJSExtensions: true,
  paths: {
    'rxjs/*': 'rxjs/*'
  },
  meta: {
    '*.json': {
      format: 'json'
    }
  },
  packages: {
    '@angular/core': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/compiler': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/common': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/http': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/forms': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser-dynamic': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/router-deprecated': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/router': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'jstimezonedetect': {
      main: 'dist/jstz.min.js',
      format: 'cjs',
      defaultExtension: 'js'
    },
    'rxjs': {
      main: 'Rx.js',
      defaultExtension: 'js'
    }
  }
});
`;

const bundleMain = () => {
  const builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  const mainpath = join(Config.TMP_DIR, Config.BOOTSTRAP_FACTORY_PROD_MODULE);
  const outpath = join(Config.JS_DEST, Config.JS_PROD_APP_BUNDLE);
  return builder
    .bundle(mainpath,
      outpath,
      Object.assign({ format: 'umd', sourceMaps: true, runtime: true }, BUNDLER_OPTIONS))
      .then((res: any) => {
        appendFileSync(outpath, `\nSystem.import('${mainpath}.js');${addExtensions}`);
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
      Object.assign({}, BUNDLER_OPTIONS, { format: 'umd', sourceMaps: true, runtime: true }))
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
  console.log(config);
  bundleMain()
    .then((bundled: string[]) => Promise.all(config.map(bundleModule.bind(null, config, bundled))))
    .then(() => done())
    .catch((e: any) => done(e));
};

