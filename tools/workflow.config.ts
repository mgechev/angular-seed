import yargs = require('yargs');
let argv = yargs.argv;

// --------------
// Configuration.
let PORT             = argv['port']        || 5555;
let LIVE_RELOAD_PORT = argv['reload-port'] || 4002;
let APP_BASE         = argv['base']        || '/';

const APP_SRC = 'app';
const APP_DEST = 'dist';
const ANGULAR_BUNDLES = './node_modules/angular2/bundles';

const PATH = {
  dest: {
    all: APP_DEST,
    dev: {
      all: APP_DEST + '/dev',
      lib: APP_DEST + '/dev/lib'
    },
    test: 'test',
    prod: {
      all: APP_DEST + '/prod',
      lib: APP_DEST + '/prod/lib'
    }
  },
  src: {
    all: APP_SRC,
    lib_inject: [
      // Order is quite important here for the HTML tag injection.
      require.resolve('es6-module-loader/dist/es6-module-loader-sans-promises.js'),
      require.resolve('es6-module-loader/dist/es6-module-loader-sans-promises.js.map'),
      require.resolve('reflect-metadata/Reflect.js'),
      require.resolve('reflect-metadata/Reflect.js.map'),
      require.resolve('systemjs/dist/system.src.js'),
      APP_SRC + '/system.config.js',
      ANGULAR_BUNDLES + '/angular2.dev.js',
      ANGULAR_BUNDLES + '/router.dev.js',
      ANGULAR_BUNDLES + '/http.dev.js'
    ],
    lib_copy_only: [
      require.resolve('systemjs/dist/system-polyfills.js'),
      require.resolve('systemjs/dist/system-polyfills.js.map')
    ]
  }
};

export = {
  PORT,
  LIVE_RELOAD_PORT,
  APP_BASE,
  APP_SRC,
  APP_DEST,
  ANGULAR_BUNDLES,
  PATH
};
