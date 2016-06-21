import { join } from 'path';
import { argv } from 'yargs';
import { InjectableDependency } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export abstract class ProjectConfig  {

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
   * The path for the base of the application at runtime.
   * The default path is `/`, which can be overriden by the `--base` flag when running `npm start`.
   * @type {string}
   */
  APP_BASE = argv['base'] || '/';

  /**
   * The base path of node modules.
   * @type {string}
   */
  NPM_DIR = '/node_modules/';

  /**
  * The flag to include templates into JS app prod file.
  * Per default the option is `true`, but can it can be set to false using `--inline-template false`
  * flag when running `npm run build.prod`.
  * @type {boolean}
  */
  INLINE_TEMPLATES = argv['inline-template'] !== 'false';

  /**
   * The flag for the hot-loader option of the application.
   * Per default the option is not set, but can be set by the `--hot-loader` flag when running `npm start`.
   * @type {boolean}
   */
  ENABLE_HOT_LOADING = argv['hot-loader'];

  /**
   * The port where the application will run, if the `hot-loader` option mode is used.
   * The default hot-loader port is `5578`.
   * @type {number}
   */
  HOT_LOADER_PORT = 5578;

  /**
   * The directory where the bootstrap file is located.
   * The default directory is `app`.
   * @type {string}
   */
  BOOTSTRAP_DIR = 'app';

  /**
   * The directory where the client files are located.
   * The default directory is `client`.
   * @type {string}
   */
  APP_CLIENT = argv['client'] || 'client';

  /**
   * The bootstrap file to be used to boot the application. The file to be used is dependent if the hot-loader option is
   * used or not.
   * Per default (non hot-loader mode) the `main.ts` file will be used, with the hot-loader option enabled, the
   * `hot_loader_main.ts` file will be used.
   * @type {string}
   */
  BOOTSTRAP_MODULE = `${this.BOOTSTRAP_DIR}/` + (this.ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main');

  /**
   * The default title of the application as used in the `<title>` tag of the
   * `index.html`.
   * @type {string}
   */
  APP_TITLE = 'Welcome to angular2-seed!';

  APP_SRC_DIR = 'src';

  /**
  * The folder of the applications asset files.
  * @type {string}
  */
  ASSETS_DIR = 'assets';


  /**
  * The folder of the applications css files.
  * @type {string}
  */
  CSS_DIR = 'css';

  /**
  * The directory of the applications tools
  * @type {string}
  */
  TOOLS_DIR = 'tools';

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
  DEV_DIR = 'dev';

  /**
  * The folder for the built files in the `prod` environment.
  * @type {string}
  */
  PROD_DEST_DIR = 'prod';

  /**
  * The folder for temporary files.
  * @type {string}
  */
  DIST_TMP_DIR = 'tmp';


  /**
 * The folder for the built CSS files.
 * @type {strings}
 */
  CSS_DEST_DIR = 'css';

  /**
  * The folder for the built JavaScript files.
  * @type {string}
  */
  JS_DEST_DIR = 'js';

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
  * The flag to enable handling of SCSS files
  * The default value is false. Override with the '--scss' flag.
  * @type {boolean}
  */
  ENABLE_SCSS = argv['scss'] || false;


  ADDITIONAL_DEPS: InjectableDependency[] = [
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];


}
