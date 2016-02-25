import {readFileSync} from 'fs';
import {argv} from 'yargs';
import {normalize, join} from 'path';
import * as chalk from 'chalk';

// --------------
// Configuration.

const ENVIRONMENTS = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};

export const PORT                 = argv['port']        || 5555;
export const PROJECT_ROOT         = normalize(join(__dirname, '..'));
export const ENV                  = getEnvironment();
export const DEBUG                = argv['debug']       || false;
export const DOCS_PORT            = argv['docs-port'] || 4003;
export const COVERAGE_PORT        = argv['coverage-port'] || 4004;
export const APP_BASE             = argv['base']        || '/';

export const ENABLE_HOT_LOADING   = !!argv['hot-loader'];
export const HOT_LOADER_PORT      = 5578;

export const BOOTSTRAP_MODULE     = ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main';

export const APP_TITLE            = 'Angular 2 Seed';

export const APP_SRC              = 'src';
export const ASSETS_SRC           = `${APP_SRC}/assets`;

export const TOOLS_DIR            = 'tools';
export const DOCS_DEST            = 'docs';
export const DIST_DIR             = 'dist';
export const DEV_DEST             = `${DIST_DIR}/dev`;
export const PROD_DEST            = `${DIST_DIR}/prod`;
export const TMP_DIR              = `${DIST_DIR}/tmp`;
export const APP_DEST             = `${DIST_DIR}/${ENV}`;
export const CSS_DEST             = `${APP_DEST}/css`;
export const JS_DEST              = `${APP_DEST}/js`;
export const APP_ROOT             = ENV === 'dev' ? `${APP_BASE}${APP_DEST}/` : `${APP_BASE}`;
export const VERSION              = appVersion();

export const CSS_PROD_BUNDLE      = 'all.css';
export const JS_PROD_SHIMS_BUNDLE = 'shims.js';
export const JS_PROD_APP_BUNDLE   = 'app.js';

export const VERSION_NPM          = '2.14.2';
export const VERSION_NODE         = '4.0.0';

export const NG2LINT_RULES        = customRules();

if (ENABLE_HOT_LOADING) {
  console.log(chalk.bgRed.white.bold('The hot loader is temporary disabled.'));
  process.exit(0);
}

interface IDependency {
  src: string;
  inject: string | boolean;
}

// Declare NPM dependencies (Note that globs should not be injected).
export const DEV_NPM_DEPENDENCIES: IDependency[] = normalizeDependencies([
  { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims' },
  { src: 'reflect-metadata/Reflect.js', inject: 'shims' },
  { src: 'es6-shim/es6-shim.js', inject: 'shims' },
  { src: 'systemjs/dist/system.src.js', inject: 'shims' },
  { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims' },
  { src: 'rxjs/bundles/Rx.js', inject: 'libs' },
  { src: 'angular2/bundles/angular2.js', inject: 'libs' },
  { src: 'angular2/bundles/router.js', inject: 'libs' },
  { src: 'angular2/bundles/http.js', inject: 'libs' }
]);

export const PROD_NPM_DEPENDENCIES: IDependency[] = normalizeDependencies([
  { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims' },
  { src: 'reflect-metadata/Reflect.js', inject: 'shims' },
  { src: 'es6-shim/es6-shim.min.js', inject: 'shims' },
  { src: 'systemjs/dist/system.js', inject: 'shims' },
  { src: 'angular2/bundles/angular2-polyfills.min.js', inject: 'libs' }
]);

// Declare local files that needs to be injected
export const APP_ASSETS: IDependency[] = [
  { src: `${ASSETS_SRC}/main.css`, inject: true }
];


export const DEV_DEPENDENCIES = DEV_NPM_DEPENDENCIES.concat(APP_ASSETS);
export const PROD_DEPENDENCIES = PROD_NPM_DEPENDENCIES.concat(APP_ASSETS);


// ----------------
// SystemsJS Configuration.
const SYSTEM_CONFIG_DEV = {
  defaultJSExtensions: true,
  paths: {
    [BOOTSTRAP_MODULE]: `${APP_BASE}${BOOTSTRAP_MODULE}`,
    'angular2/*': `${APP_BASE}angular2/*`,
    'rxjs/*': `${APP_BASE}rxjs/*`,
    '*': `${APP_BASE}node_modules/*`
  },
  packages: {
    angular2: { defaultExtension: false },
    rxjs: { defaultExtension: false }
  }
};

export const SYSTEM_CONFIG = SYSTEM_CONFIG_DEV;

export const SYSTEM_BUILDER_CONFIG = {
  defaultJSExtensions: true,
  paths: {
    [`${TMP_DIR}/*`]: `${TMP_DIR}/*`,
    '*': 'node_modules/*'
  }
};

// --------------
// Private.

function normalizeDependencies(deps: IDependency[]) {
  deps
    .filter((d:IDependency) => !/\*/.test(d.src)) // Skip globs
    .forEach((d:IDependency) => d.src = require.resolve(d.src));
  return deps;
}

function appVersion(): number|string {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}

function customRules(): string[] {
  var lintConf = JSON.parse(readFileSync('tslint.json').toString());
  return lintConf.rulesDirectory;
}

function getEnvironment() {
  let base:string[] = argv['_'];
  let prodKeyword = !!base.filter(o => o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0).pop();
  if (base && prodKeyword || argv['env'] === ENVIRONMENTS.PRODUCTION) {
    return ENVIRONMENTS.PRODUCTION;
  } else {
    return ENVIRONMENTS.DEVELOPMENT;
  }
}
