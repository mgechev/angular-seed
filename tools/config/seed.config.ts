import {argv} from 'yargs';
import {join} from 'path';
import {InjectableDependency, Environments} from './seed.config.interfaces';

export const ENVIRONMENTS: Environments = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};


export class SeedConfig {
  PORT                 = argv['port']                        || 5555;
  PROJECT_ROOT         = join(__dirname, '../..');
  ENV                  = getEnvironment();
  DEBUG                = argv['debug']                       || false;
  DOCS_PORT            = argv['docs-port']                   || 4003;
  COVERAGE_PORT        = argv['coverage-port']               || 4004;
  APP_BASE             = argv['base']                        || '/';

  ENABLE_HOT_LOADING   = argv['hot-loader'];
  HOT_LOADER_PORT      = 5578;

  BOOTSTRAP_MODULE     = this.ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main';

  APP_TITLE            = 'My Angular2 App';

  APP_SRC              = 'src/client';
  ASSETS_SRC           = `${this.APP_SRC}/assets`;
  CSS_SRC              = `${this.APP_SRC}/css`;

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
  VERSION              = appVersion();

  CSS_PROD_BUNDLE      = 'all.css';
  JS_PROD_SHIMS_BUNDLE = 'shims.js';
  JS_PROD_APP_BUNDLE   = 'app.js';

  VERSION_NPM          = '2.14.2';
  VERSION_NODE         = '4.0.0';

  CODELYZER_RULES      = customRules();

  NPM_DEPENDENCIES: InjectableDependency[] = [
    { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'reflect-metadata/Reflect.js', inject: 'shims' },
    { src: 'es6-shim/es6-shim.js', inject: 'shims' },
    { src: 'systemjs/dist/system.src.js', inject: 'shims', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims' },
    { src: 'rxjs/bundles/Rx.js', inject: 'libs', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'angular2/bundles/angular2.js', inject: 'libs', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'angular2/bundles/router.js', inject: 'libs', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'angular2/bundles/http.js', inject: 'libs', env: ENVIRONMENTS.DEVELOPMENT }
  ];

  // Declare local files that needs to be injected
  APP_ASSETS: InjectableDependency[] = [
    { src: `${this.CSS_SRC}/main.css`, inject: true, vendor: false }
  ];

  get DEPENDENCIES(): InjectableDependency[] {
    return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, this.ENV)))
      .concat(this.APP_ASSETS.filter(filterDependency.bind(null, this.ENV)));
  }


  // ----------------
  // SystemsJS Configuration.
  protected SYSTEM_CONFIG_DEV = {
    defaultJSExtensions: true,
    packageConfigPaths: [
      `${this.APP_BASE}node_modules/*/package.json`,
      `${this.APP_BASE}node_modules/**/package.json`
    ],
    paths: {
      [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
      'angular2/*': `${this.APP_BASE}angular2/*`,
      'rxjs/*': `${this.APP_BASE}rxjs/*`,
      'app/*': `/app/*`,
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
    packageConfigPaths: [join(this.PROJECT_ROOT, 'node_modules', '*', 'package.json')],
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

  // ----------------
  // Browser Sync configuration.
  BROWSER_SYNC_CONFIG: any = {
    middleware: [require('connect-history-api-fallback')({index: `${this.APP_BASE}index.html`})],
    port: this.PORT,
    startPath: this.APP_BASE,
    server: {
      baseDir: `${this.DIST_DIR}/empty/`,
      routes: {
        [`${this.APP_BASE}${this.APP_DEST}`]: this.APP_DEST,
        [`${this.APP_BASE}node_modules`]: 'node_modules',
        [`${this.APP_BASE.replace(/\/$/,'')}`]: this.APP_DEST
      }
    }
  };
}




// --------------
// Utils.

function filterDependency(env: string, d: InjectableDependency): boolean {
  if (!d.env) {
    d.env = Object.keys(ENVIRONMENTS).map(k => ENVIRONMENTS[k]);
  }
  if (!(d.env instanceof Array)) {
    (<any>d).env = [d.env];
  }
  return d.env.indexOf(env) >= 0;
}

export function normalizeDependencies(deps: InjectableDependency[]) {
  deps
    .filter((d:InjectableDependency) => !/\*/.test(d.src)) // Skip globs
    .forEach((d:InjectableDependency) => d.src = require.resolve(d.src));
  return deps;
}

function appVersion(): number|string {
  var pkg = require('../../package.json');
  return pkg.version;
}

function customRules(): string[] {
  var lintConf = require('../../tslint.json');
  return lintConf.rulesDirectory;
}

function getEnvironment() {
  let base:string[] = argv['_'];
  let prodKeyword = !!base.filter(o => o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0).pop();
  let env = (argv['env'] || '').toLowerCase();
  if ((base && prodKeyword) || env === ENVIRONMENTS.PRODUCTION) {
    return ENVIRONMENTS.PRODUCTION;
  } else {
    return ENVIRONMENTS.DEVELOPMENT;
  }
}
