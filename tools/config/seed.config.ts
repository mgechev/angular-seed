import { join } from 'path';
import { argv } from 'yargs';
import { ProjectConfig } from './project.config.ts';
import { Environments, InjectableDependency } from './seed.config.interfaces';

/**
 * The enumeration of available environments.
 * @type {Environments}
 */
export const ENVIRONMENTS: Environments = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};

/**
 * This class represents the basic configuration of the seed.
 * It provides the following:
 * - Constants for directories, ports, versions etc.
 * - Injectable NPM dependencies
 * - Injectable application assets
 * - Temporary editor files to be ignored by the watcher and asset builder
 * - SystemJS configuration
 * - Autoprefixer configuration
 * - BrowserSync configuration
 * - Utilities
 */
export class SeedConfig extends ProjectConfig {


  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  /**
  * The current environment.
  * The default environment is `dev`, which can be overriden by the `--env` flag when running `npm start`.
  */
  ENV = getEnvironment();


  NPM_BASE = join(this.APP_BASE, this.NPM_DIR);


  /**
   * The base folder of the applications source files.
   * @type {string}
   */
  APP_SRC = `${this.APP_SRC_DIR}/${this.APP_CLIENT}`;


  ASSETS_SRC = `${this.APP_SRC}/${this.ASSETS_DIR}`;


  CSS_SRC = `${this.APP_SRC}/${this.CSS_DIR}`;


  /**
   * The directory of the tasks provided by the seed.
   */
  SEED_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'seed');


  DEV_DEST = `${this.DIST_DIR}/${this.DEV_DIR}`;


  PROD_DEST = `${this.DIST_DIR}/${this.PROD_DEST_DIR}`;


  TMP_DIR = `${this.DIST_DIR}/${this.DIST_TMP_DIR}`;

  /**
   * The folder for the built files, corresponding to the current environment.
   * @type {string}
   */
  APP_DEST = this.ENV === ENVIRONMENTS.DEVELOPMENT ? this.DEV_DEST : this.PROD_DEST;


  CSS_DEST = `${this.APP_DEST}/${this.CSS_DEST_DIR}`;


  JS_DEST = `${this.APP_DEST}/${this.JS_DEST_DIR}`;

  /**
   * The version of the application as defined in the `package.json`.
   */
  VERSION = appVersion();


  /**
   * The ruleset to be used by `codelyzer` for linting the TypeScript files.
   */
  CODELYZER_RULES = customRules();

  /**
   * The list of NPM dependcies to be injected in the `index.html`.
   * @type {InjectableDependency[]}
   */
  NPM_DEPENDENCIES: InjectableDependency[] = [
    { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'zone.js/dist/zone.js', inject: 'libs' },
    { src: 'core-js/client/shim.min.js', inject: 'shims' },
    { src: 'systemjs/dist/system.src.js', inject: 'shims', env: ENVIRONMENTS.DEVELOPMENT },
    { src: 'rxjs/bundles/Rx.js', inject: 'libs', env: ENVIRONMENTS.DEVELOPMENT }
  ];



  /**
   * The list of local files to be injected in the `index.html`.
   * @type {InjectableDependency[]}
   */
  APP_ASSETS: InjectableDependency[] = [
    { src: `${this.CSS_SRC}/main.${ this.getInjectableStyleExtension() }`, inject: true, vendor: false },
  ];

  /**
   * The list of editor temporary files to ignore in watcher and asset builder.
   * @type {string[]}
   */
  TEMP_FILES: string[] = [
    '**/*___jb_tmp___',
    '**/*~',
  ];


  /**
   * Returns the array of injectable dependencies (npm dependencies and assets).
   * @return {InjectableDependency[]} The array of npm dependencies and assets.
   */
  get DEPENDENCIES(): InjectableDependency[] {
    return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, this.ENV)))
      .concat(this.APP_ASSETS.filter(filterDependency.bind(null, this.ENV)));
  }

  /**
   * The configuration of SystemJS for the `dev` environment.
   * @type {any}
   */
  protected SYSTEM_CONFIG_DEV: any = {
    defaultJSExtensions: true,
    packageConfigPaths: [
      `node_modules/*/package.json`,
      `node_modules/**/package.json`,
      `node_modules/@angular/*/package.json`
    ],
    paths: {
      [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
      '@angular/core': `node_modules/@angular/core/bundles/core.umd.js`,
      '@angular/common': `node_modules/@angular/common/bundles/common.umd.js`,
      '@angular/compiler': `node_modules/@angular/compiler/bundles/compiler.umd.js`,
      '@angular/forms': `node_modules/@angular/forms/bundles/forms.umd.js`,
      '@angular/http': `node_modules/@angular/http/bundles/http.umd.js`,
      '@angular/router': `node_modules/@angular/router/index.js`,
      '@angular/platform-browser': `node_modules/@angular/platform-browser/bundles/platform-browser.umd.js`,
      '@angular/platform-browser-dynamic': `node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js`,
      'rxjs/*': `node_modules/rxjs/*`,
      'app/*': `/app/*`,
      '*': `node_modules/*`
    },
    packages: {
      rxjs: { defaultExtension: false }
    }
  };

  /**
   * The configuration of SystemJS of the application.
   * Per default, the configuration of the `dev` environment will be used.
   * @type {any}
   */
  SYSTEM_CONFIG: any = this.SYSTEM_CONFIG_DEV;

  /**
   * The system builder configuration of the application.
   * @type {any}
   */
  SYSTEM_BUILDER_CONFIG: any = {
    defaultJSExtensions: true,
    packageConfigPaths: [
      join(this.PROJECT_ROOT, 'node_modules', '*', 'package.json'),
      join(this.PROJECT_ROOT, 'node_modules', '@angular', '*', 'package.json')
    ],
    paths: {
      [`${this.TMP_DIR}/*`]: `${this.TMP_DIR}/*`,
      '*': 'node_modules/*'
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
      '@angular/platform-browser': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/platform-browser-dynamic': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/router': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'rxjs': {
        defaultExtension: 'js'
      }
    }
  };

  /**
   * The Autoprefixer configuration for the application.
   * @type {Array}
   */
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

  /**
   * Configurations for NPM module configurations. Add to or override in project.config.ts.
   * If you like, use the mergeObject() method to assist with this.
   */
  PLUGIN_CONFIGS: any = {
    /**
     * The BrowserSync configuration of the application.
     * The default open behavior is to open the browser. To prevent the browser from opening use the `--b`  flag when
     * running `npm start` (tested with serve.dev).
     * Example: `npm start -- --b`
     * @type {any}
     */
    'browser-sync': {
      middleware: [require('connect-history-api-fallback')({ index: `${this.APP_BASE}index.html` })],
      port: this.PORT,
      startPath: this.APP_BASE,
      open: argv['b'] ? false : true,
      injectChanges: false,
      server: {
        baseDir: `${this.DIST_DIR}/empty/`,
        routes: {
          [`${this.APP_BASE}${this.APP_DEST}`]: this.APP_DEST,
          [`${this.APP_BASE}node_modules`]: 'node_modules',
          [`${this.APP_BASE.replace(/\/$/, '')}`]: this.APP_DEST
        }
      }
    }
  };

  /**
   * Recursively merge source onto target.
   * @param {any} target The target object (to receive values from source)
   * @param {any} source The source object (to be merged onto target)
   */
  mergeObject(target: any, source: any) {
    const deepExtend = require('deep-extend');
    deepExtend(target, source);
  }

  /**
   * Locate a plugin configuration object by plugin key.
   * @param {any} pluginKey The object key to look up in PLUGIN_CONFIGS.
   */
  getPluginConfig(pluginKey: string): any {
    if (this.PLUGIN_CONFIGS[ pluginKey ]) {
      return this.PLUGIN_CONFIGS[pluginKey];
    }
    return null;
  }

  getInjectableStyleExtension() {
    return this.ENV === ENVIRONMENTS.PRODUCTION && this.ENABLE_SCSS ? 'scss' : 'css';
  }


  constructor() {
    super();
    this.NPM_DEPENDENCIES.concat(this.ADDITIONAL_DEPS);
  }

}

/**
 * Normalizes the given `deps` to skip globs.
 * @param {InjectableDependency[]} deps - The dependencies to be normalized.
 */
export function normalizeDependencies(deps: InjectableDependency[]) {
  deps
    .filter((d: InjectableDependency) => !/\*/.test(d.src)) // Skip globs
    .forEach((d: InjectableDependency) => d.src = require.resolve(d.src));
  return deps;
}

/**
 * Returns if the given dependency is used in the given environment.
 * @param  {string}               env - The environment to be filtered for.
 * @param  {InjectableDependency} d   - The dependency to check.
 * @return {boolean}                    `true` if the dependency is used in this environment, `false` otherwise.
 */
function filterDependency(env: string, d: InjectableDependency): boolean {
  if (!d.env) {
    d.env = Object.keys(ENVIRONMENTS).map(k => ENVIRONMENTS[k]);
  }
  if (!(d.env instanceof Array)) {
    (<any>d).env = [d.env];
  }
  return d.env.indexOf(env) >= 0;
}

/**
 * Returns the applications version as defined in the `package.json`.
 * @return {number} The applications version.
 */
function appVersion(): number | string {
  var pkg = require('../../package.json');
  return pkg.version;
}

/**
 * Returns the linting configuration to be used for `codelyzer`.
 * @return {string[]} The list of linting rules.
 */
function customRules(): string[] {
  var lintConf = require('../../tslint.json');
  return lintConf.rulesDirectory;
}

/**
 * Returns the environment of the application.
 */
function getEnvironment() {
  let base: string[] = argv['_'];
  let prodKeyword = !!base.filter(o => o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0).pop();
  let env = (argv['env'] || '').toLowerCase();
  if ((base && prodKeyword) || env === ENVIRONMENTS.PRODUCTION) {
    return ENVIRONMENTS.PRODUCTION;
  } else {
    return ENVIRONMENTS.DEVELOPMENT;
  }
}

