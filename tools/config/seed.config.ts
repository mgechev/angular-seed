import { join } from 'path';
import { argv } from 'yargs';

import { Environments, InjectableDependency } from './seed.config.interfaces';

/**
 * The enumeration of available environments.
 * @type {Environments}
 */
export const ENVIRONMENTS: Environments = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};

const warnInvalidSet = (prop: string) => {
  console.warn('You cannot set the property ' + prop);
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
export class SeedConfig {

  /**
   * The port where the application will run.
   * The default port is `5555`, which can be overriden by the  `--port` flag when running `npm start`.
   * @type {number}
   */
  get PORT() {
    return argv['port'] || 5555;
  }
  set PORT(val: number) {
    warnInvalidSet('PORT');
  }

  /**
   * The root folder of the project (up two levels from the current directory).
   */
  get PROJECT_ROOT() {
    return join(__dirname, '../..');
  }
  set PROJECT_ROOT(val: any) {
    warnInvalidSet('PROJECT_ROOT');
  }

  /**
   * The current environment.
   * The default environment is `dev`, which can be overriden by the `--env` flag when running `npm start`.
   */
  get ENV() {
    return getEnvironment();
  }
  set ENV(val: any) {
    warnInvalidSet('ENV');
  }

  /**
   * The flag for the debug option of the application.
   * The default value is `false`, which can be overriden by the `--debug` flag when running `npm start`.
   * @type {boolean}
   */
  get DEBUG() {
    return argv['debug'] || false;
  }
  set DEBUG(val: boolean) {
    warnInvalidSet('DEBUG');
  }

  /**
   * The port where the documentation application will run.
   * The default docs port is `4003`, which can be overriden by the `--docs-port` flag when running `npm start`.
   * @type {number}
   */
  get DOCS_PORT() {
    return argv['docs-port'] || 4003;
  }
  set DOCS_PORT(val: number) {
    warnInvalidSet('DOCS_PORT');
  }

  /**
   * The port where the unit test coverage report application will run.
   * The default coverage port is `4004`, which can by overriden by the `--coverage-port` flag when running `npm start`.
   * @type {number}
   */
  get COVERAGE_PORT() {
    return argv['coverage-port'] || 4004;
  }
  set COVERAGE_PORT(port: number) {
    warnInvalidSet('COVERAGE_PORT');
  }

  /**
   * The path for the base of the application at runtime.
   * The default path is `/`, which can be overriden by the `--base` flag when running `npm start`.
   * @type {string}
   */
  get APP_BASE() {
    return argv['base'] || '/';
  }
  set APP_BASE(val: string) {
    warnInvalidSet('APP_BASE');
  }

  /**
   * The flag to include templates into JS app prod file.
   * Per default the option is `true`, but can it can be set to false using `--inline-template false`
   * flag when running `npm run build.prod`.
   * @type {boolean}
   */
  get INLINE_TEMPLATES() {
    return argv['inline-template'] !== 'false';
  }
  set INLINE_TEMPLATES(val: boolean) {
    warnInvalidSet('INLINE_TEMPLATES');
  }

  /**
   * The flag for the hot-loader option of the application.
   * Per default the option is not set, but can be set by the `--hot-loader` flag when running `npm start`.
   * @type {boolean}
   */
  get ENABLE_HOT_LOADING() {
    return argv['hot-loader'];
  }
  set ENABLE_HOT_LOADING(val: any) {
    warnInvalidSet('ENABLE_HOT_LOADING');
  }

  /**
   * The port where the application will run, if the `hot-loader` option mode is used.
   * The default hot-loader port is `5578`.
   * @type {number}
   */
  get HOT_LOADER_PORT() {
    return 5578;
  }
  set HOT_LOADER_PORT(port: number) {
    warnInvalidSet('HOT_LOADER_PORT');
  }

  /**
   * The directory where the bootstrap file is located.
   * The default directory is `app`.
   * @type {string}
   */
  get BOOTSTRAP_DIR() {
    return 'app';
  }
  set BOOTSTRAP_DIR(dir: any) {
    warnInvalidSet('BOOTSTRAP_DIR');
  }

  /**
   * The directory where the client files are located.
   * The default directory is `client`.
   * @type {string}
   */
  get APP_CLIENT() {
    return argv['client'] || 'client';
  }
  set APP_CLIENT(val: string) {
    warnInvalidSet('APP_CLIENT');
  }

  /**
   * The bootstrap file to be used to boot the application. The file to be used is dependent if the hot-loader option is
   * used or not.
   * Per default (non hot-loader mode) the `main.ts` file will be used, with the hot-loader option enabled, the
   * `hot_loader_main.ts` file will be used.
   * @type {string}
   */
  get BOOTSTRAP_MODULE() {
    return `${this.BOOTSTRAP_DIR}/` + (this.ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main');
  }
  set BOOTSTRAP_MODULE(val: any) {
    warnInvalidSet('BOOTSTRAP_MODULE');
  }

  /**
   * The default title of the application as used in the `<title>` tag of the
   * `index.html`.
   * @type {string}
   */
  get APP_TITLE() {
    return 'Welcome to angular2-seed!';
  }
  set APP_TITLE(val: string) {
    warnInvalidSet('APP_TITLE');
  }

  /**
   * The base folder of the applications source files.
   * @type {string}
   */
  get APP_SRC() {
    return `src/${this.APP_CLIENT}`;
  }
  set APP_SRC(val: any) {
    warnInvalidSet('APP_SRC');
  }

  /**
   * The folder of the applications asset files.
   * @type {string}
   */
  get ASSETS_SRC() {
    return `${this.APP_SRC}/assets`;
  }
  set ASSETS_SRC(val: any) {
    warnInvalidSet('ASSETS_SRC');
  }

  /**
   * The folder of the applications css files.
   * @type {string}
   */
  get CSS_SRC() {
    return `${this.APP_SRC}/css`;
  }
  set CSS_SRC(val: any) {
    warnInvalidSet('CSS_SRC');
  }

  /**
   * The directory of the applications tools
   * @type {string}
   */
  get TOOLS_DIR() {
    return 'tools';
  }
  set TOOLS_DIR(dir: string) {
    warnInvalidSet('TOOLS_DIR');
  }

  /**
   * The directory of the tasks provided by the seed.
   */
  get SEED_TASKS_DIR() {
    return join(process.cwd(), this.TOOLS_DIR, 'tasks', 'seed');
  }
  set SEED_TASKS_DIR(val: any) {
    warnInvalidSet('SEED_TASKS_DIR');
  }

  /**
   * The destination folder for the generated documentation.
   * @type {string}
   */
  get DOCS_DEST() {
    return 'docs';
  }
  set DOCS_DEST(val: string) {
    warnInvalidSet('DOCS_DEST');
  }

  /**
   * The base folder for built files.
   * @type {string}
   */
  get DIST_DIR() {
    return 'dist';
  }
  set DIST_DIR(val: string) {
    warnInvalidSet('DIST_DIR');
  }

  /**
   * The folder for built files in the `dev` environment.
   * @type {string}
   */
  get DEV_DEST() {
    return `${this.DIST_DIR}/dev`;
  }
  set DEV_DEST(val: any) {
    warnInvalidSet('DEV_DEST');
  }

  /**
   * The folder for the built files in the `prod` environment.
   * @type {string}
   */
  get PROD_DEST() {
    return `${this.DIST_DIR}/prod`;
  }
  set PROD_DEST(val: any) {
    warnInvalidSet('PROD_DEST');
  }

  /**
   * The folder for temporary files.
   * @type {string}
   */
  get TMP_DIR() {
    return `${this.DIST_DIR}/tmp`;
  }
  set TMP_DIR(val: any) {
    warnInvalidSet('TMP_DIR');
  }

  /**
   * The folder for the built files, corresponding to the current environment.
   * @type {string}
   */
  get APP_DEST() {
    return this.ENV === ENVIRONMENTS.DEVELOPMENT ? this.DEV_DEST : this.PROD_DEST;
  }
  set APP_DEST(val: any) {
    warnInvalidSet('APP_DEST');
  }

  /**
   * The folder for the built CSS files.
   * @type {strings}
   */
  get CSS_DEST() {
    return `${this.APP_DEST}/css`;
  }
  set CSS_DEST(val: any) {
    warnInvalidSet('CSS_DEST');
  }

  /**
   * The folder for the built JavaScript files.
   * @type {string}
   */
  get JS_DEST() {
    return `${this.APP_DEST}/js`;
  }
  set JS_DEST(val: any) {
    warnInvalidSet('JS_DEST');
  }

  /**
   * The version of the application as defined in the `package.json`.
   */
  get VERSION() {
    return appVersion();
  }
  set VERSION(val: any) {
    warnInvalidSet('VERSION');
  }

  /**
   * The name of the bundle file to includes all CSS files.
   * @type {string}
   */
  get CSS_PROD_BUNDLE() {
    return 'main.css';
  }
  set CSS_PROD_BUNDLE(val: string) {
    warnInvalidSet('CSS_PROD_BUNDLE');
  }

  /**
   * The name of the bundle file to include all JavaScript shims.
   * @type {string}
   */
  get JS_PROD_SHIMS_BUNDLE() {
    return 'shims.js';
  }
  set JS_PROD_SHIMS_BUNDLE(val: string) {
    warnInvalidSet('JS_PROD_SHIMS_BUNDLE');
  }

  /**
   * The name of the bundle file to include all JavaScript application files.
   * @type {string}
   */
  get JS_PROD_APP_BUNDLE() {
    return 'app.js';
  }
  set JS_PROD_APP_BUNDLE(val: string) {
    warnInvalidSet('JS_PROD_APP_BUNDLE');
  }

  /**
   * The required NPM version to run the application.
   * @type {string}
   */
  get VERSION_NPM() {
    return '2.14.2';
  }
  set VERSION_NPM(val: string) {
    warnInvalidSet('VERSION_NPM');
  }

  /**
   * The required NodeJS version to run the application.
   * @type {string}
   */
  get VERSION_NODE() {
    return '4.0.0';
  }
  set VERSION_NODE(val: string) {
    warnInvalidSet('VERSION_NODE');
  }

  /**
   * The ruleset to be used by `codelyzer` for linting the TypeScript files.
   */
  get CODELYZER_RULES() {
    return customRules();
  }
  set CODELYZER_RULES(val: any) {
    warnInvalidSet('CODELYZER_RULES');
  }

  /**
   * The flag to enable handling of SCSS files
   * The default value is false. Override with the '--scss' flag.
   * @type {boolean}
   */
  get ENABLE_SCSS() {
    return argv['scss'] || false;
  }
  set ENABLE_SCSS(val: boolean) {
    warnInvalidSet('ENABLE_SCSS');
  }

  /**
   * The list of NPM dependcies to be injected in the `index.html`.
   * @type {InjectableDependency[]}
   */
  get NPM_DEPENDENCIES(): InjectableDependency[] {
    return [
      { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims', env: ENVIRONMENTS.DEVELOPMENT },
      { src: 'zone.js/dist/zone.js', inject: 'libs' },
      { src: 'core-js/client/shim.min.js', inject: 'shims' },
      { src: 'systemjs/dist/system.src.js', inject: 'shims', env: ENVIRONMENTS.DEVELOPMENT },
      { src: 'rxjs/bundles/Rx.js', inject: 'libs', env: ENVIRONMENTS.DEVELOPMENT }
    ];
  }
  set NPM_DEPENDENCIES(val: InjectableDependency[]) {
    warnInvalidSet('NPM_DEPENDENCIES');
  }

  /**
   * The list of local files to be injected in the `index.html`.
   * @type {InjectableDependency[]}
   */
  get APP_ASSETS(): InjectableDependency[] {
    return [
      { src: `${this.CSS_SRC}/main.${this.getInjectableStyleExtension()}`, inject: true, vendor: false },
    ];
  }
  set APP_ASSETS(val: InjectableDependency[]) {
    warnInvalidSet('APP_ASSETS');
  }

  /**
   * The list of editor temporary files to ignore in watcher and asset builder.
   * @type {string[]}
   */
  get TEMP_FILES(): string[] {
    return [
      '**/*___jb_tmp___',
      '**/*~',
    ];
  }
  set TEMP_FILES(val: string[]) {
    warnInvalidSet('TEMP_FILES');
  }

  /**
   * Returns the array of injectable dependencies (npm dependencies and assets).
   * @return {InjectableDependency[]} The array of npm dependencies and assets.
   */
  get DEPENDENCIES(): InjectableDependency[] {
    return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, this.ENV)))
      .concat(this.APP_ASSETS.filter(filterDependency.bind(null, this.ENV)));
  }
  set DEPENDENCIES(val: InjectableDependency[]) {
    warnInvalidSet('DEPENDENCIES');
  }

  /**
   * The configuration of SystemJS for the `dev` environment.
   * @type {any}
   */
  protected get SYSTEM_CONFIG_DEV(): any {
    return {
      defaultJSExtensions: true,
      packageConfigPaths: [
        `${this.APP_BASE}node_modules/*/package.json`,
        `${this.APP_BASE}node_modules/**/package.json`,
        `${this.APP_BASE}node_modules/@angular/*/package.json`
      ],
      paths: {
        [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
        '@angular/core': `${this.APP_BASE}node_modules/@angular/core/core.umd.js`,
        '@angular/common': `${this.APP_BASE}node_modules/@angular/common/common.umd.js`,
        '@angular/compiler': `${this.APP_BASE}node_modules/@angular/compiler/compiler.umd.js`,
        '@angular/http': `${this.APP_BASE}node_modules/@angular/http/http.umd.js`,
        '@angular/router': `${this.APP_BASE}node_modules/@angular/router/router.umd.js`,
        '@angular/platform-browser':
        `${this.APP_BASE}node_modules/@angular/platform-browser/platform-browser.umd.js`,
        '@angular/platform-browser-dynamic':
        `${this.APP_BASE}node_modules/@angular/platform-browser-dynamic/platform-browser-dynamic.umd.js`,
        'rxjs/*': `${this.APP_BASE}node_modules/rxjs/*`,
        'app/*': `/app/*`,
        '*': `${this.APP_BASE}node_modules/*`
      },
      packages: {
        rxjs: { defaultExtension: false }
      }
    };
  }
  protected set SYSTEM_CONFIG_DEV(val: any) {
    warnInvalidSet('SYSTEM_CONFIG_DEV');
  }

  /**
   * The configuration of SystemJS of the application.
   * Per default, the configuration of the `dev` environment will be used.
   * @type {any}
   */
  get SYSTEM_CONFIG(): any {
    return this.SYSTEM_CONFIG_DEV;
  }
  set SYSTEM_CONFIG(val: any) {
    warnInvalidSet('SYSTEM_CONFIG');
  }

  /**
   * The system builder configuration of the application.
   * @type {any}
   */
  get SYSTEM_BUILDER_CONFIG(): any {
    return {
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
  }
  set SYSTEM_BUILDER_CONFIG(val: any) {
    warnInvalidSet('SYSTEM_BUILDER_CONFIG');
  }

  /**
   * The Autoprefixer configuration for the application.
   * @type {Array}
   */
  get BROWSER_LIST() {
    return [
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
  set BROWSER_LIST(val: any) {
    warnInvalidSet('BROWSER_LIST');
  }

  /**
   * Configurations for NPM module configurations. Add to or override in project.config.ts.
   * If you like, use the mergeObject() method to assist with this.
   */
  get PLUGIN_CONFIGS(): any {
    return {
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
  }
  set PLUGIN_CONFIGS(val: any) {
    warnInvalidSet('PLUGIN_CONFIGS');
  }

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
