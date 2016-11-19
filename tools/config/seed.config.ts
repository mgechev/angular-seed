import { join } from 'path';
import * as slash from 'slash';
import { argv } from 'yargs';

import { BuildType, ExtendPackages, InjectableDependency } from './seed.config.interfaces';

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
 * 1) https://github.com/mgechev/angular2-seed/tree/master/tools
 * 2) https://github.com/mgechev/angular2-seed/wiki
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
  APP_TITLE = 'Welcome to angular2-seed!';

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
  CSS_PROD_BUNDLE = 'main.css';

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
   * The list of NPM dependcies to be injected in the `index.html`.
   * @type {InjectableDependency[]}
   */
  NPM_DEPENDENCIES: InjectableDependency[] = [
    { src: 'zone.js/dist/zone.js', inject: 'libs' },
    { src: 'core-js/client/shim.min.js', inject: 'shims' },
    { src: 'intl/dist/Intl.min.js', inject: 'shims' },
    { src: 'systemjs/dist/system.src.js', inject: 'shims', buildType: BUILD_TYPES.DEVELOPMENT },
    // Temporary fix. See https://github.com/angular/angular/issues/9359
    { src: '.tmp/Rx.min.js', inject: 'libs', buildType: BUILD_TYPES.DEVELOPMENT },
  ];

  /**
   * The list of local files to be injected in the `index.html`.
   * @type {InjectableDependency[]}
   */
  APP_ASSETS: InjectableDependency[] = [
    { src: `${this.CSS_SRC}/main.${this.getInjectableStyleExtension()}`, inject: true, vendor: false },
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
    return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, this.BUILD_TYPE)))
      .concat(this.APP_ASSETS.filter(filterDependency.bind(null, this.BUILD_TYPE)));
  }

  /**
   * The configuration of SystemJS for the `dev` environment.
   * @type {any}
   */
  SYSTEM_CONFIG_DEV: any = {
    defaultJSExtensions: true,
    paths: {
      [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
      '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
      '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
      '@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',
      '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
      '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',

      '@angular/common/testing': 'node_modules/@angular/common/bundles/common-testing.umd.js',
      '@angular/compiler/testing': 'node_modules/@angular/compiler/bundles/compiler-testing.umd.js',
      '@angular/core/testing': 'node_modules/@angular/core/bundles/core-testing.umd.js',
      '@angular/http/testing': 'node_modules/@angular/http/bundles/http-testing.umd.js',
      '@angular/platform-browser/testing':
        'node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
      '@angular/platform-browser-dynamic/testing':
        'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
      '@angular/router/testing': 'node_modules/@angular/router/bundles/router-testing.umd.js',

      'app/*': '/app/*',
      // For test config
      'dist/dev/*': '/base/dist/dev/*',
      '*': 'node_modules/*'
    },
    packages: {
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
    ],
    paths: {
      // Note that for multiple apps this configuration need to be updated
      // You will have to include entries for each individual application in
      // `src/client`.
      [join(this.TMP_DIR, this.BOOTSTRAP_DIR, '*')]: `${this.TMP_DIR}/${this.BOOTSTRAP_DIR}/*`,
      'dist/tmp/node_modules/*': 'dist/tmp/node_modules/*',
      'node_modules/*': 'node_modules/*',
      '*': 'node_modules/*'
    },
    packages: {
      '@angular/common': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/compiler': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/core/testing': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/core': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/forms': {
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
      middleware: [require('connect-history-api-fallback')({
        index: `${this.APP_BASE}index.html`
      })],
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
      targetFile: this.CSS_PROD_BUNDLE,
      options: {
        rebaseUrls: false
      }
    }
  };

  constructor() {
    for (let proxy of this.getProxyMiddleware()) {
      this.PLUGIN_CONFIGS['browser-sync'].middleware.push(proxy);
    }
  }

  /**
   * Get proxy middleware configuration. Add in your project config like:
   * getProxyMiddleware(): Array<any> {
   *   const proxyMiddleware = require('http-proxy-middleware');
   *   return [
   *     proxyMiddleware('/ws', {
   *       ws: false,
   *       target: 'http://localhost:3003'
   *     })
   *   ];
   * }
   */
  getProxyMiddleware(): Array<any> {
    return [];
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
    if (this.PLUGIN_CONFIGS[pluginKey]) {
      return this.PLUGIN_CONFIGS[pluginKey];
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
