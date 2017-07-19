import { join } from 'path';
import * as slash from 'slash';
import { argv } from 'yargs';

import {
  BuildType, ExtendPackages, InjectableDependency,
  SourceMapExplorerOutputFormat
} from './seed.config.interfaces';

/************************* DO NOT CHANGE ************************
 *
 * DO NOT make any changes in this file because it will
 * make your migration to newer versions of the seed harder.
 *
 * Your application-specific configurations should be
 * in project.config.ts. If you need to change any tasks
 * from "./tasks" overwrite them by creating a task with the
 * same name in "./projects". For further information take a
 * look at the documentation:
 *
 * 1) https://github.com/mgechev/angular-seed/tree/master/tools
 * 2) https://github.com/mgechev/angular-seed/wiki
 *
 *****************************************************************/

/**
 * The enumeration of available environments.
 * @type {Environments}
 */
export const BUILD_TYPES: BuildType = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};

/**
 * The enumeration of available source-map-explorer output formats.
 * @type {SourceMapExplorerOutputFormats}
 */
export const SME_OUTPUT_FORMATS: SourceMapExplorerOutputFormat = {
  HTML: 'html',
  JSON: 'json',
  TSV: 'tsv'
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
  PORT = argv['port'] || 5555;

  /**
   * The root folder of the project (up two levels from the current directory).
   */
  PROJECT_ROOT = join(__dirname, '../..');

  /**
   * The current build type.
   * The default build type is `dev`, which can be overriden by the `--build-type dev|prod` flag when running `npm start`.
   */
  BUILD_TYPE = getBuildType();

  /**
   * The flag to determine preserving source maps on build or not.
   * The default value is `false`, which can be overriden by the `--preserve-source-maps` flag when running `npm start`.
   */
  PRESERVE_SOURCE_MAPS = argv['preserve-source-maps'] || false;

  /**
   * The current source-map-explorer output format.
   * The default value is `html`, which can be overriden by the `--sme-out-format html|json|tsv` flag when running `npm run sme`.
   */
  SME_OUT_FORMAT = getSmeOutFormat();

  /**
   * The current source-map-explorer output folder.
   */
  SME_DIR = 'sme';

  /**
   * The flag for the debug option of the application.
   * The default value is `false`, which can be overriden by the `--debug` flag when running `npm start`.
   * @type {boolean}
   */
  DEBUG = argv['debug'] || false;

  /**
   * The port where the documentation application will run.
   * The default docs port is `4003`, which can be overriden by the `--docs-port` flag when running `npm start`.
   * @type {number}
   */
  DOCS_PORT = argv['docs-port'] || 4003;

  /**
   * The port where the unit test coverage report application will run.
   * The default coverage port is `4004`, which can by overriden by the `--coverage-port` flag when running `npm start`.
   * @type {number}
   */
  COVERAGE_PORT = argv['coverage-port'] || 4004;

  /**
  * The path to the coverage output
  * NB: this must match what is configured in ./karma.conf.js
  */
  COVERAGE_DIR = 'coverage_js';
  COVERAGE_TS_DIR = 'coverage';

  /**
   * The path for the base of the application at runtime.
   * The default path is based on the environment '/',
   * which can be overriden by the `--base` flag when running `npm start`.
   * @type {string}
   */
  APP_BASE = argv['base'] || '/';

  /**
   * The base path of node modules.
   * @type {string}
   */
  NPM_BASE = slash(join('.', this.APP_BASE, 'node_modules/'));

  /**
   * The build interval which will force the TypeScript compiler to perform a typed compile run.
   * Between the typed runs, a typeless compile is run, which is typically much faster.
   * For example, if set to 5, the initial compile will be typed, followed by 5 typeless runs,
   * then another typed run, and so on.
   * If a compile error is encountered, the build will use typed compilation until the error is resolved.
   * The default value is `0`, meaning typed compilation will always be performed.
   * @type {number}
   */
  TYPED_COMPILE_INTERVAL = 0;

  /**
   * The directory where the bootstrap file is located.
   * The default directory is `app`.
   * @type {string}
   */
  BOOTSTRAP_DIR = argv['app'] || 'app';

  /**
   * The directory where the client files are located.
   * The default directory is `client`.
   * @type {string}
   */
  APP_CLIENT = argv['client'] || 'client';

  /**
   * The bootstrap file to be used to boot the application.
   * @type {string}
   */
  BOOTSTRAP_MODULE = `${this.BOOTSTRAP_DIR}/main`;

  BOOTSTRAP_PROD_MODULE = `${this.BOOTSTRAP_DIR}/` + 'main';

  NG_FACTORY_FILE = 'main-prod';

  BOOTSTRAP_FACTORY_PROD_MODULE = `${this.BOOTSTRAP_DIR}/${this.NG_FACTORY_FILE}`;
  /**
   * The default title of the application as used in the `<title>` tag of the
   * `index.html`.
   * @type {string}
   */
  APP_TITLE = 'Welcome to angular-seed!';

  /**
   * Tracking ID.
   * @type {string}
   */
  GOOGLE_ANALYTICS_ID = 'UA-XXXXXXXX-X';

  /**
   * The base folder of the applications source files.
   * @type {string}
   */
  APP_SRC = `src/${this.APP_CLIENT}`;

  /**
   * The name of the TypeScript project file
   * @type {string}
   */
  APP_PROJECTNAME = 'tsconfig.json';

  /**
   * The folder of the applications asset files.
   * @type {string}
   */
  ASSETS_SRC = `${this.APP_SRC}/assets`;

  /**
   * The folder of the applications css files.
   * @type {string}
   */
  CSS_SRC = `${this.APP_SRC}/css`;

  /**
   * The folder of the e2e specs and framework
   */
  E2E_SRC = 'src/e2e';

  /**
   * The folder of the applications scss files.
   * @type {string}
   */
  SCSS_SRC = `${this.APP_SRC}/scss`;

  /**
   * The directory of the applications tools
   * @type {string}
   */
  TOOLS_DIR = 'tools';

  /**
   * The directory of the tasks provided by the seed.
   */
  SEED_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'seed');

  /**
   * Seed tasks which are composition of other tasks.
   */
  SEED_COMPOSITE_TASKS = join(process.cwd(), this.TOOLS_DIR, 'config', 'seed.tasks.json');

  /**
   * Project tasks which are composition of other tasks
   * and aim to override the tasks defined in
   * SEED_COMPOSITE_TASKS.
   */
  PROJECT_COMPOSITE_TASKS = join(process.cwd(), this.TOOLS_DIR, 'config', 'project.tasks.json');

  /**
   * The destination folder for the generated documentation.
   * @type {string}
   */
  DOCS_DEST = 'docs';

  /**
   * The base folder for built files.
   * @type {string}
   */
  DIST_DIR = 'dist';

  /**
   * The folder for built files in the `dev` environment.
   * @type {string}
   */
  DEV_DEST = `${this.DIST_DIR}/dev`;

  /**
   * The folder for the built files in the `prod` environment.
   * @type {string}
   */
  PROD_DEST = `${this.DIST_DIR}/prod`;

  /**
   * The folder for the built files of the e2e-specs.
   * @type {string}
   */
  E2E_DEST = `${this.DIST_DIR}/e2e`;

  /**
   * The folder for the built translation file.
   * @type {string}
   */
  LOCALE_DEST = `${this.DIST_DIR}/locale`;

  /**
   * The folder for temporary files.
   * @type {string}
   */
  TMP_DIR = `${this.DIST_DIR}/tmp`;

  /**
   * The folder for the built files, corresponding to the current environment.
   * @type {string}
   */
  APP_DEST = this.BUILD_TYPE === BUILD_TYPES.DEVELOPMENT ? this.DEV_DEST : this.PROD_DEST;

  /**
   * The folder for the built CSS files.
   * @type {strings}
   */
  CSS_DEST = `${this.APP_DEST}/css`;

  /**
   * The folder for the built JavaScript files.
   * @type {string}
   */
  JS_DEST = `${this.APP_DEST}/js`;

  /**
   * The version of the application as defined in the `package.json`.
   */
  VERSION = appVersion();

  /**
   * The name of the bundle file to includes all CSS files.
   * @type {string}
   */
  CSS_BUNDLE_NAME = 'main';

  /**
   * The name of the bundle file to include all JavaScript shims.
   * @type {string}
   */
  JS_PROD_SHIMS_BUNDLE = 'shims.js';

  /**
   * The name of the bundle file to include all JavaScript application files.
   * @type {string}
   */
  JS_PROD_APP_BUNDLE = 'app.js';

  /**
   * The required NPM version to run the application.
   * @type {string}
   */
  VERSION_NPM = '2.14.2';

  /**
   * The required NodeJS version to run the application.
   * @type {string}
   */
  VERSION_NODE = '4.0.0';

  /**
   * Enable SCSS stylesheet compilation.
   * Set ENABLE_SCSS environment variable to 'true' or '1'
   * @type {boolean}
   */
  ENABLE_SCSS = ['true', '1'].indexOf(`${process.env.ENABLE_SCSS}`.toLowerCase()) !== -1 || argv['scss'] || false;

  /**
   * Enable tslint emit error by setting env variable FORCE_TSLINT_EMIT_ERROR
   * @type {boolean}
   */
  FORCE_TSLINT_EMIT_ERROR = !!process.env.FORCE_TSLINT_EMIT_ERROR;

  /**
   * Extra paths for the gulp process to watch for to trigger compilation.
   * @type {string[]}
   */
  EXTRA_WATCH_PATHS: string[] = [];

  /**
   * The list of NPM dependcies to be injected in the `index.html`.
   * @type {InjectableDependency[]}
   */
  NPM_DEPENDENCIES: InjectableDependency[] = [
    { src: 'core-js/client/shim.min.js', inject: 'shims' },
    { src: 'zone.js/dist/zone.js', inject: 'libs' },
    { src: 'zone.js/dist/long-stack-trace-zone.js', inject: 'libs', buildType: BUILD_TYPES.DEVELOPMENT },
    { src: 'intl/dist/Intl.min.js', inject: 'shims' },
    { src: 'systemjs/dist/system.src.js', inject: 'shims', buildType: BUILD_TYPES.DEVELOPMENT },
    // Temporary fix. See https://github.com/angular/angular/issues/9359
    { src: '.tmp/Rx.min.js', inject: 'libs', buildType: BUILD_TYPES.DEVELOPMENT },
  ];

  /**
   * The list of local files to be injected in the `index.html`.
   * @type {InjectableDependency[]}
   */
  APP_ASSETS: InjectableDependency[] = [];

  /**
   * The list of editor temporary files to ignore in watcher and asset builder.
   * @type {string[]}
   */
  TEMP_FILES: string[] = [
    '**/*___jb_tmp___',
    '**/*~',
  ];

  /**
   * List of directories to include in commonjs
   * @type {string[]}
   */
  ROLLUP_INCLUDE_DIR: string[] = ['node_modules/**'];

 /**
  * List of named export Object key value pairs
  * key: dependencie file
  * value: exported Objects
  */
  ROLLUP_NAMED_EXPORTS: any[] = [];

  /**
   * Returns the array of injectable dependencies (npm dependencies and assets).
   * @return {InjectableDependency[]} The array of npm dependencies and assets.
   */
  get DEPENDENCIES(): InjectableDependency[] {
    return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, this.BUILD_TYPE)))
      .concat(this._APP_ASSETS.filter(filterDependency.bind(null, this.BUILD_TYPE)));
  }

  /**
   * The configuration of SystemJS for the `dev` environment.
   * @type {any}
   */
  SYSTEM_CONFIG_DEV: any = {
    paths: {
      [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
      '@angular/animations': 'node_modules/@angular/animations/bundles/animations.umd.js',
      '@angular/platform-browser/animations': 'node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
      '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
      '@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',
      '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
      '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
      '@angular/animations/browser': 'node_modules/@angular/animations/bundles/animations-browser.umd.js',

      '@angular/common/testing': 'node_modules/@angular/common/bundles/common-testing.umd.js',
      '@angular/compiler/testing': 'node_modules/@angular/compiler/bundles/compiler-testing.umd.js',
      '@angular/core/testing': 'node_modules/@angular/core/bundles/core-testing.umd.js',
      '@angular/http/testing': 'node_modules/@angular/http/bundles/http-testing.umd.js',
      '@angular/platform-browser/testing':
        'node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
      '@angular/platform-browser-dynamic/testing':
        'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
      '@angular/router/testing': 'node_modules/@angular/router/bundles/router-testing.umd.js',

      'app/': `${this.APP_BASE}app/`,
      // For test config
      'dist/dev/': '/base/dist/dev/',
      '': 'node_modules/'
    },
    packages: {
      [this.BOOTSTRAP_DIR]: {
        defaultExtension: 'js'
      }
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
    base: this.PROJECT_ROOT,
    packageConfigPaths: [
      join('node_modules', '*', 'package.json'),
      join('node_modules', '@angular', '*', 'package.json')
      // for other modules like @ngx-translate the package.json path needs to updated here
      // otherwise npm run build.prod would fail
      // join('node_modules', '@ngx-translate', '*', 'package.json')
    ],
    paths: {
      // Note that for multiple apps this configuration need to be updated
      // You will have to include entries for each individual application in
      // `src/client`.
      [join(this.TMP_DIR, this.BOOTSTRAP_DIR, '*')]: `${this.TMP_DIR}/${this.BOOTSTRAP_DIR}/*`,
      '@angular/platform-browser/animations': 'node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/animations/browser': 'node_modules/@angular/animations/bundles/animations-browser.umd.js',
      'dist/tmp/node_modules/*': 'dist/tmp/node_modules/*',
      'node_modules/*': 'node_modules/*',
      '*': 'node_modules/*'
    },
    packages: {
      '@angular/animations': {
        main: 'bundles/animations.umd.js',
        defaultExtension: 'js'
      },
      '@angular/common': {
        main: 'bundles/common.umd.js',
        defaultExtension: 'js'
      },
      '@angular/compiler': {
        main: 'bundles/compiler.umd.js',
        defaultExtension: 'js'
      },
      '@angular/core/testing': {
        main: 'bundles/core-testing.umd.js',
        defaultExtension: 'js'
      },
      '@angular/core': {
        main: 'bundles/core.umd.js',
        defaultExtension: 'js'
      },
      '@angular/forms': {
        main: 'bundles/forms.umd.js',
        defaultExtension: 'js'
      },
      '@angular/http': {
        main: 'bundles/http.umd.js',
        defaultExtension: 'js'
      },
      '@angular/platform-browser': {
        main: 'bundles/platform-browser.umd.js',
        defaultExtension: 'js'
      },
      '@angular/platform-browser-dynamic': {
        main: 'bundles/platform-browser-dynamic.umd.js',
        defaultExtension: 'js'
      },
      '@angular/router': {
        main: 'bundles/router.umd.js',
        defaultExtension: 'js'
      },
      '@angular/service-worker': {
        main: 'bundles/service-worker.umd.js',
        defaultExtension: 'js'
      },
      'rxjs': {
        main: 'Rx.js',
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
   * White list for CSS color guard
   * @type {[string, string][]}
   */
  COLOR_GUARD_WHITE_LIST: [string, string][] = [
  ];

  /**
  * Browser-sync middleware configurations array.
  * @type {Array}
  */
  PROXY_MIDDLEWARE: any[] = [];

  /**
   * Configurations for NPM module configurations. Add to or override in project.config.ts.
   * @type {any}
   */
  PLUGIN_CONFIGS: any = {};

  /**
   * Generates the query string which should be appended to the end of the URLs in dev mode.
   */
  QUERY_STRING_GENERATOR = () => {
    return Date.now().toString();
  }

  /**
   * Returns the array of injectable dependencies (the list of local files to be injected in the `index.html`).
   * @return {InjectableDependency[]}
   */
  private get _APP_ASSETS(): InjectableDependency[] {
    return [
      ...this.APP_ASSETS,
      { src: `${this.CSS_SRC}/${this.CSS_BUNDLE_NAME}.${this.getInjectableStyleExtension()}`, inject: true, vendor: false },
    ];
  }

  /**
   * Returns the configuration object for NPM module configurations.
   */
  private get _PLUGIN_CONFIGS(): any {
    /**
     * The BrowserSync configuration of the application.
     * The default open behavior is to open the browser. To prevent the browser from opening use the `--b`  flag when
     * running `npm start` (tested with serve.dev).
     * Example: `npm start -- --b`
     * @return {any}
     */
    let defaults = {
      'browser-sync': {
        middleware: [require('connect-history-api-fallback')({
          index: `${this.APP_BASE}index.html`
        }), ...this.PROXY_MIDDLEWARE],
        port: this.PORT,
        startPath: this.APP_BASE,
        open: argv['b'] ? false : true,
        injectChanges: false,
        server: {
          baseDir: `${this.DIST_DIR}/empty/`,
          routes: {
            [`${this.APP_BASE}${this.APP_SRC}`]: this.APP_SRC,
            [`${this.APP_BASE}${this.APP_DEST}`]: this.APP_DEST,
            [`${this.APP_BASE}node_modules`]: 'node_modules',
            [`${this.APP_BASE.replace(/\/$/, '')}`]: this.APP_DEST
          }
        }
      },

      // Note: you can customize the location of the file
      'environment-config': join(this.PROJECT_ROOT, this.TOOLS_DIR, 'env'),

      /**
       * The options to pass to gulp-sass (and then to node-sass).
       * Reference: https://github.com/sass/node-sass#options
       * @type {object}
       */
      'gulp-sass': {
        includePaths: ['./node_modules/']
      },

      /**
       * The options to pass to gulp-concat-css
       * Reference: https://github.com/mariocasciaro/gulp-concat-css
       * @type {object}
       */
      'gulp-concat-css': {
        targetFile: `${this.CSS_BUNDLE_NAME}.css`,
        options: {
          rebaseUrls: false
        }
      }
    };

    this.mergeObject(defaults, this.PLUGIN_CONFIGS);

    return defaults;
  }

  /**
   * Karma reporter configuration
   */
  getKarmaReporters(): any {
    return {
      preprocessors: {
        'dist/**/!(*spec|index|*.module|*.routes).js': ['coverage']
      },
      reporters: ['mocha', 'coverage', 'karma-remap-istanbul'],
      coverageReporter: {
        dir: this.COVERAGE_DIR + '/',
        reporters: [
          { type: 'json', subdir: '.', file: 'coverage-final.json' },
          { type: 'html', subdir: '.' }
        ]
      },
      remapIstanbulReporter: {
        reports: {
          html: this.COVERAGE_TS_DIR
        }
      }
    };
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
    if (this._PLUGIN_CONFIGS[pluginKey]) {
      return this._PLUGIN_CONFIGS[pluginKey];
    }
    return null;
  }

  getInjectableStyleExtension() {
    return this.BUILD_TYPE === BUILD_TYPES.PRODUCTION && this.ENABLE_SCSS ? 'scss' : 'css';
  }

  addPackageBundles(pack: ExtendPackages) {

    if (pack.path) {
      this.SYSTEM_CONFIG_DEV.paths[pack.name] = pack.path;
      this.SYSTEM_BUILDER_CONFIG.paths[pack.name] = pack.path;
    }

    if (pack.packageMeta) {
      this.SYSTEM_CONFIG_DEV.packages[pack.name] = pack.packageMeta;
      this.SYSTEM_BUILDER_CONFIG.packages[pack.name] = pack.packageMeta;
    }
  }

  addPackagesBundles(packs: ExtendPackages[]) {

    packs.forEach((pack: ExtendPackages) => {
      this.addPackageBundles(pack);
    });

  }

/**
 * Convert named rollup array to object
 */
  getRollupNamedExports() {
    let namedExports = {};
    this.ROLLUP_NAMED_EXPORTS.map(namedExport => {
      namedExports = Object.assign(namedExports, namedExport);
    });
    return namedExports;
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
function filterDependency(type: string, d: InjectableDependency): boolean {
  const t = d.buildType || d.env;
  d.buildType = t;
  if (!t) {
    d.buildType = Object.keys(BUILD_TYPES).map(k => BUILD_TYPES[k]);
  }
  if (!(d.buildType instanceof Array)) {
    (<any>d).env = [d.buildType];
  }
  return d.buildType.indexOf(type) >= 0;
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
 * Returns the application build type.
 */
function getBuildType() {
  let type = (argv['build-type'] || argv['env'] || '').toLowerCase();
  let base: string[] = argv['_'];
  let prodKeyword = !!base.filter(o => o.indexOf(BUILD_TYPES.PRODUCTION) >= 0).pop();
  if ((base && prodKeyword) || type === BUILD_TYPES.PRODUCTION) {
    return BUILD_TYPES.PRODUCTION;
  } else {
    return BUILD_TYPES.DEVELOPMENT;
  }
}

function getSmeOutFormat() {
  let format = (argv['sme-out-format'] || '').toUpperCase();
  return SME_OUTPUT_FORMATS[format] || SME_OUTPUT_FORMATS.HTML;
}
