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

  CODELYZER_RULES      = customRules();

  NPM_DEPENDENCIES: InjectableDependency[] = [
    { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'reflect-metadata/Reflect.js', inject: 'shims', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'es6-shim/es6-shim.js', inject: 'shims', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'systemjs/dist/system.src.js', inject: 'shims', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims' },
    { src: 'rxjs/bundles/Rx.js', inject: 'libs', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'angular2/bundles/angular2.js', inject: 'libs', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'angular2/bundles/router.js', inject: 'libs', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'angular2/bundles/http.js', inject: 'libs', env: ENVIRONMENTS.DEVELOPMENT }
  ];

  // Declare local files that needs to be injected
  APP_ASSETS: InjectableDependency[] = [
    { src: `${this.ASSETS_SRC}/main.css`, inject: true, vendor: false }
  ];


  get PROD_DEPENDENCIES(): InjectableDependency[] {
    console.warn('The property "PROD_DEPENDENCIES" is deprecated. Consider using "DEPENDENCIES" instead.');
    return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, ENVIRONMENTS.PRODUCTION)))
      .concat(this.APP_ASSETS.filter(filterDependency.bind(null, ENVIRONMENTS.PRODUCTION)));
  }

  get DEV_DEPENDENCIES(): InjectableDependency[] {
    console.warn('The property "DEV_DEPENDENCIES" is deprecated. Consider using "DEPENDENCIES" instead.');
    return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, ENVIRONMENTS.DEVELOPMENT)))
      .concat(this.APP_ASSETS.filter(filterDependency.bind(null, ENVIRONMENTS.DEVELOPMENT)));
  }

  set DEV_DEPENDENCIES(val: InjectableDependency[]) {
    console.warn('The property "DEV_DEPENDENCIES" is deprecated. Consider using "DEPENDENCIES" instead.');
  }

  set PROD_DEPENDENCIES(val: InjectableDependency[]) {
    console.warn('The property "PROD_DEPENDENCIES" is deprecated. Consider using "DEPENDENCIES" instead.');
  }

  get DEV_NPM_DEPENDENCIES(): InjectableDependency[] {
    console.warn('The property "DEV_NPM_DEPENDENCIES" is deprecated. Consider using "DEPENDENCIES" instead.');
    return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, ENVIRONMENTS.DEVELOPMENT)));
  }
  get PROD_NPM_DEPENDENCIES(): InjectableDependency[] {
    console.warn('The property "PROD_NPM_DEPENDENCIES" is deprecated. Consider using "DEPENDENCIES" instead.');
    return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, ENVIRONMENTS.PRODUCTION)));
  }
  set DEV_NPM_DEPENDENCIES(value: InjectableDependency[]) {
    console.warn('The property "DEV_NPM_DEPENDENCIES" is deprecated. Consider using "DEPENDENCIES" instead.');
    const notDev = this.NPM_DEPENDENCIES.filter(d => !filterDependency(ENVIRONMENTS.DEVELOPMENT, d));
    this.NPM_DEPENDENCIES = notDev.concat(value);
  }
  set PROD_NPM_DEPENDENCIES(value: InjectableDependency[]) {
    console.warn('The property "PROD_NPM_DEPENDENCIES" is deprecated. Consider using "DEPENDENCIES" instead.');
    const notProd = this.NPM_DEPENDENCIES.filter(d => !filterDependency(ENVIRONMENTS.PRODUCTION, d));
    this.NPM_DEPENDENCIES = notProd.concat(value);
  }

  get DEPENDENCIES(): InjectableDependency[] {
    return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, this.ENV)))
      .concat(this.APP_ASSETS.filter(filterDependency.bind(null, this.ENV)));
  }

  // ----------------
  // SystemsJS Configuration.
  protected SYSTEM_CONFIG_DEV = {
    defaultJSExtensions: true,
    packageConfigPaths: [`${this.APP_BASE}node_modules/*/package.json`],
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
  getEnvDependencies() {
    console.warn('The "getEnvDependencies" method is deprecated. Consider using "DEPENDENCIES" instead.');
    if (this.ENV === 'prod') {
      return this.PROD_DEPENDENCIES;
    } else {
      return this.DEV_DEPENDENCIES;
    }
  }
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
  if (base && prodKeyword || argv['env'] === ENVIRONMENTS.PRODUCTION) {
    return ENVIRONMENTS.PRODUCTION;
  } else {
    return ENVIRONMENTS.DEVELOPMENT;
  }
}
