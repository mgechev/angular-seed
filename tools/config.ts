import {readFileSync} from 'fs';
import {argv} from 'yargs';

let resolve = require.resolve;

// --------------
// Configuration.
export const ENV              = argv['env']         || 'dev';
export const DEBUG            = argv['debug']       || false;

export const PORT             = argv['port']        || 5555;
export const LIVE_RELOAD_PORT = argv['reload-port'] || 4002;
export const DOCS_PORT        = argv['docs-port']   || 4003;
export const APP_BASE         = argv['base']        || '/';

export const APP_SRC          = 'app';
export const APP_DEST         = 'dist';
export const APP_DOCS         = 'docs';
export const ANGULAR_BUNDLES  = './node_modules/angular2/bundles';
export const VERSION          = version();

export const VERSION_NPM      = '3.0.0';
export const VERSION_NODE     = '4.0.0';

export const PATH = {
  cwd: process.cwd(),
  tools: 'tools',
  docs :`${APP_DEST}/${APP_DOCS}`,
  dest: {
    all: APP_DEST,
    dev: {
      all: `${APP_DEST}/${ENV}`,
      lib: `${APP_DEST}/${ENV}/lib`,
      css: `${APP_DEST}/${ENV}/css`,
      assets: `${APP_DEST}/${ENV}/assets`,
      fonts: `${APP_DEST}/${ENV}/fonts`
    },
    test: 'test',
    tmp: '.tmp'
  },
  src: {
    all: APP_SRC,
    jslib_inject: [
      // Order is quite important here for the HTML tag injection.
      resolve('es6-shim/es6-shim.min.js'),
      resolve('es6-shim/es6-shim.map'),
      resolve('reflect-metadata/Reflect.js'),
      resolve('reflect-metadata/Reflect.js.map'),
      resolve('systemjs/dist/system.src.js'),
      `${APP_SRC}/system.config.js`,
      `${ANGULAR_BUNDLES}/angular2.dev.js`,
      `${ANGULAR_BUNDLES}/router.dev.js`,
      `${ANGULAR_BUNDLES}/http.dev.js`
    ],
    jslib_copy_only: [
      resolve('systemjs/dist/system-polyfills.js'),
      resolve('systemjs/dist/system-polyfills.js.map')
    ],
    csslib: [
      resolve('bootstrap/dist/css/bootstrap.css'),
      resolve('bootstrap/dist/css/bootstrap.css.map')
    ],
    assets: [
      `${APP_SRC}/assets/**/*`
    ],
    fonts: [
      resolve('bootstrap/dist/fonts/glyphicons-halflings-regular.eot'),
      resolve('bootstrap/dist/fonts/glyphicons-halflings-regular.svg'),
      resolve('bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'),
      resolve('bootstrap/dist/fonts/glyphicons-halflings-regular.woff'),
      resolve('bootstrap/dist/fonts/glyphicons-halflings-regular.woff2')
    ]
  }
};


// --------------
// Private.
function version(): number|string {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}
