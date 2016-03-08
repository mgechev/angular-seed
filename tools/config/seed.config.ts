import {readFileSync} from 'fs';
import {argv} from 'yargs';
import {normalize, join} from 'path';
import {InjectableDependency} from './seed.config.interface';

const ENVIRONMENTS = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};


export class SeedConfig {
  PORT                 = argv['port']                        || 5555;
  PROJECT_ROOT         = normalize(join(__dirname, '..'));
  ENV                  = getEnvironment();
  DEBUG                = argv['debug']                       || false;
  DOCS_PORT            = argv['docs-port']                   || 4003;
  COVERAGE_PORT        = argv['coverage-port']               || 4004;
  APP_BASE             = argv['base']                        || '/';

  ENABLE_HOT_LOADING   = argv['hot-loader'];
  HOT_LOADER_PORT      = 5578;

  BOOTSTRAP_MODULE     = this.ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main';

  APP_TITLE            = 'My Angular2 App';

  APP_SRC              = 'src';
  ASSETS_SRC           = `${this.APP_SRC}/assets`;

  TOOLS_DIR            = 'tools';
  SEED_TASKS_DIR       = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'seed');
  DOCS_DEST            = 'docs';
  DIST_DIR             = 'dist';
  DEV_DEST             = `${this.DIST_DIR}/dev`;
  PROD_DEST            = `${this.DIST_DIR}/prod`;
  TMP_DIR              = `${this.DIST_DIR}/tmp`;
  APP_DEST             = `${this.DIST_DIR}/${this.ENV}`;
  CSS_DEST             = `${this.APP_DEST}/css`;
  JS_DEST              = `${this.APP_DEST}/js`;
  APP_ROOT             = this.ENV === 'dev' ? `${this.APP_BASE}${this.APP_DEST}/` : `${this.APP_BASE}`;
  VERSION              = appVersion();

  CSS_PROD_BUNDLE      = 'all.css';
  JS_PROD_SHIMS_BUNDLE = 'shims.js';
  JS_PROD_APP_BUNDLE   = 'app.js';

  VERSION_NPM          = '2.14.2';
  VERSION_NODE         = '4.0.0';

  NG2LINT_RULES        = customRules();


  // Declare NPM dependencies (Note that globs should not be injected).
  DEV_NPM_DEPENDENCIES: InjectableDependency[] = normalizeDependencies([
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

  PROD_NPM_DEPENDENCIES: InjectableDependency[] = normalizeDependencies([
    { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims' },
    { src: 'reflect-metadata/Reflect.js', inject: 'shims' },
    { src: 'es6-shim/es6-shim.min.js', inject: 'shims' },
    { src: 'systemjs/dist/system.js', inject: 'shims' },
    { src: 'angular2/bundles/angular2-polyfills.min.js', inject: 'libs' }
  ]);

  // Declare local files that needs to be injected
  APP_ASSETS: InjectableDependency[] = [
    { src: `${this.ASSETS_SRC}/main.css`, inject: true, vendor: false }
  ];


  DEV_DEPENDENCIES = this.DEV_NPM_DEPENDENCIES.concat(this.APP_ASSETS);
  PROD_DEPENDENCIES = this.PROD_NPM_DEPENDENCIES.concat(this.APP_ASSETS);


  // ----------------
  // SystemsJS Configuration.
  protected SYSTEM_CONFIG_DEV = {
    defaultJSExtensions: true,
    paths: {
      [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
      'angular2/*': `${this.APP_BASE}angular2/*`,
      'rxjs/*': `${this.APP_BASE}rxjs/*`,
      '*': `${this.APP_BASE}node_modules/*`
    },
    packages: {
      angular2: { defaultExtension: false },
      rxjs: { defaultExtension: false }
    }
  };

  SYSTEM_CONFIG = this.SYSTEM_CONFIG_DEV;

  SYSTEM_BUILDER_CONFIG = {
    defaultJSExtensions: true,
    paths: {
      [`${this.TMP_DIR}/*`]: `${this.TMP_DIR}/*`,
      '*': 'node_modules/*'
    }
  };

  // ----------------
  // Autoprefixer configuration.
  BROWSER_LIST = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];
}




// --------------
// Utils.

export function normalizeDependencies(deps: InjectableDependency[]) {
  deps
    .filter((d:InjectableDependency) => !/\*/.test(d.src)) // Skip globs
    .forEach((d:InjectableDependency) => d.src = require.resolve(d.src));
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
