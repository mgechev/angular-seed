import {argv} from "yargs";
import * as chalk from "chalk";

const ENVIRONMENTS = {
  DEVELOPMENT: "dev",
  PRODUCTION: "prod"
};

const app_base = "base";
const port     = "port";
export const APP_BASE             = argv[app_base] || "/";
export const PORT                 = argv[port] || 3000;
export const APP_SRC              = "client_src";
export const TOOLS_DIR            = "tools";
export const SERVER_SRC           = "server_src";
export const APP_TITLE            = "RT3";
export const ASSETS_SRC           = `${APP_SRC}/assets`;
export const ENV                  = getEnvironment();
export const APP_DEST             = `dist/${ENV}`;
export const JS_DEST              = `${APP_DEST}/js`;
export const CSS_DEST             = `${APP_DEST}/css`;
export const SERVER_DEST          = `dist/server`;
export const TMP_DIR              = "tmp";
export const CSS_PROD_BUNDLE      = "all.css";
export const JS_PROD_SHIMS_BUNDLE = "shims.js";
export const JS_PROD_APP_BUNDLE   = "app.js";
export const ENABLE_HOT_LOADING   = !!argv["hot-loader"];
export const BOOTSTRAP_MODULE     = ENABLE_HOT_LOADING ? "hot_loader_main" : "main";

if (ENABLE_HOT_LOADING) {
  console.log(chalk.bgRed.white.bold("The hot loader is temporary disabled."));
  process.exit(0);
}

interface InjectableDependency {
  src: string;
  inject: string | boolean;
  dest?: string;
}

// declare NPM dependencies (Note that globs should not be injected).
export const DEV_NPM_DEPENDENCIES: InjectableDependency[] = normalizeDependencies([
  { src: "systemjs/dist/system-polyfills.src.js", inject: "shims", dest: JS_DEST },
  { src: "reflect-metadata/Reflect.js", inject: "shims", dest: JS_DEST },
  { src: "es6-shim/es6-shim.min.js", inject: "shims", dest: JS_DEST },
  { src: "systemjs/dist/system.src.js", inject: "shims", dest: JS_DEST },
  { src: "angular2/bundles/angular2-polyfills.js", inject: "shims", dest: JS_DEST },
  { src: "jquery/dist/jquery.min.js", inject: "libs", dest: JS_DEST },
  { src: "jquery-ui/themes/base/jquery-ui.css", inject: true, dest: CSS_DEST },
  { src: "bootstrap/dist/css/bootstrap.min.css", inject: true, dest: CSS_DEST },
  { src: "bootstrap/dist/js/bootstrap.min.js", inject: "libs", dest: JS_DEST }
  // { src: "intl/dist/Intl.js", inject: "shims", dest: JS_DEST },  // Fixes Safari Intl support
  // { src: "intl/locale-data/jsonp/en.js", inject: "shims", dest: JS_DEST } // Need this too.
]);

export const PROD_NPM_DEPENDENCIES: InjectableDependency[] = normalizeDependencies([
  { src: "systemjs/dist/system-polyfills.src.js", inject: "shims" },
  { src: "reflect-metadata/Reflect.js", inject: "shims" },
  { src: "es6-shim/es6-shim.min.js", inject: "shims" },
  { src: "systemjs/dist/system.js", inject: "shims" },
  { src: "angular2/bundles/angular2-polyfills.min.js", inject: "libs" },
  { src: "jquery/dist/jquery.min.js", inject: "libs", dest: JS_DEST },
  { src: "jquery-ui/themes/base/jquery-ui.css", inject: true, dest: CSS_DEST },
  { src: "bootstrap/dist/css/bootstrap.min.css", inject: true, dest: CSS_DEST },
  { src: "bootstrap/dist/js/bootstrap.min.js", inject: "libs", dest: JS_DEST }
  // { src: "intl/dist/Intl.js", inject: "shims"},  // Fixes Safari Intl support
  // { src: "intl/locale-data/jsonp/en.js", inject: "shims"} // Need this too.
]);

// declare local files that needs to be injected
export const APP_ASSETS: InjectableDependency[] = [
  { src: `${ASSETS_SRC}/main.css`, inject: true, dest: CSS_DEST }
];

export const DEV_DEPENDENCIES = DEV_NPM_DEPENDENCIES.concat(APP_ASSETS);
export const PROD_DEPENDENCIES = PROD_NPM_DEPENDENCIES.concat(APP_ASSETS);

// systemsJS Configuration.
const SYSTEM_CONFIG_DEV = {
  defaultJSExtensions: true,
  shim : {
        "bootstrap"     : { "deps" : ["jquery"] },
        "jquery-ui/*"   : { "deps" : ["jquery"] }
  },
  paths: {
    [BOOTSTRAP_MODULE]: `${APP_BASE}${BOOTSTRAP_MODULE}`,
    "angular2/*": "node_modules/angular2/*",
    // "ng-semantic": "node_modules/ng-semantic/ng-semantic.js",
    // "ng-semantic/ng-semantic/*": "node_modules/ng-semantic/ng-semantic/*.js",
    "rxjs/*": "node_modules/rxjs/*",
    // "d3" : `${APP_BASE}node_modules/d3/d3`,
    // "moment" : `${APP_BASE}node_modules/moment/moment`,
    // "redux" : `${APP_BASE}node_modules/redux/dist/redux`,
    // "socket.io-client" : `${APP_BASE}node_modules/socket.io-client/socket.io`,
    // "underscore" : `${APP_BASE}node_modules/underscore/underscore`,
    // "jquery" : `${APP_BASE}node_modules/jquery/dist/jquery.min.js`,
    // "jquery-ui/*" : `${APP_BASE}node_modules/jquery-ui/*.js`,
    // "bootstrap" : `${APP_BASE}node_modules/bootstrap/dist/js/bootstrap.min.js`,
    "*": `${APP_BASE}node_modules/*`
  }
};

export const SYSTEM_CONFIG = SYSTEM_CONFIG_DEV;

export const SYSTEM_BUILDER_CONFIG = {
  defaultJSExtensions: true,
  shim : {
        "bootstrap"     : { "deps" : ["jquery"] },
        "jquery-ui/*"   : { "deps" : ["jquery"] }
  },
  paths: {
    "*": `${TMP_DIR}/*`,
    "angular2/core": "node_modules/angular2/core.js",
    "angular2/router": "node_modules/angular2/router.js",
    "angular2/http": "node_modules/angular2/http.js",
    "angular2/platform/*": "node_modules/angular2/platform/*.js",
    "angular2/src/core/*": "node_modules/angular2/src/core/*.js",
    "angular2/src/facade/*": "node_modules/angular2/src/facade/*.js",
    "angular2/src/http/*": "node_modules/angular2/src/http/*.js",
    "angular2/src/platform/*": "node_modules/angular2/src/platform/*.js",
    "angular2/compiler": "node_modules/angular2/compiler.js",
    "angular2/common": "node_modules/angular2/common.js",
    "angular2/src/router/*": "node_modules/angular2/src/router/*.js",
    "angular2/src/compiler/*": "node_modules/angular2/src/compiler/*.js",
    "angular2/src/animate/*": "node_modules/angular2/src/animate/*.js",
    "angular2/src/common/*": "node_modules/angular2/src/common/*.js",
    "angular2/src/transform/*": "node_modules/angular2/src/transform/*.js",
    // "ng-semantic": "node_modules/ng-semantic/ng-semantic.js",
    // "ng-semantic/ng-semantic/*": "node_modules/ng-semantic/ng-semantic/*",
    "rxjs/*": "node_modules/rxjs/*"
    // "rxjs/operator/*" : "node_modules/rxjs/add/operator/*",
    // "d3" : "node_modules/d3/d3.js",     // For some reason on Heroku, the .js is required
    // "moment" : "node_modules/moment/moment.js",
    // "redux" : "node_modules/redux/dist/redux.js",
    // "socket.io-client" : "node_modules/socket.io-client/socket.io.js",
    // "underscore" : "node_modules/underscore/underscore.js",
    // "jquery" : "node_modules/jquery/dist/jquery.min.js", // can remove
    // "jquery-ui/*" : "node_modules/jquery-ui/*.js", // can remove
    // "bootstrap" : "node_modules/bootstrap/dist/js/bootstrap.min.js" // can remove
  }
};
function getEnvironment() {
  let env = "_";
  let base: string[] = argv[env];
  env = "env";
  let prodKeyword = !!base.filter(o => o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0).pop();
  if (base && prodKeyword || argv[env] === ENVIRONMENTS.PRODUCTION) {
    return ENVIRONMENTS.PRODUCTION;
  } else {
    return ENVIRONMENTS.DEVELOPMENT;
  }
}

function normalizeDependencies(deps: InjectableDependency[]) {
  deps
    .filter((d: InjectableDependency) => !/\*/.test(d.src)) // skip globs
    .forEach((d: InjectableDependency) => d.src = require.resolve(d.src));
  return deps;
}
