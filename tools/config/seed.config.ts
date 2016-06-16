import { join } from 'path';
import { argv } from 'yargs';

import { Environments } from './ISeedConfig';

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
 * - Constants for versions & environments.
 * - Utilities
 */
export class SeedConfig {

  /**
   * The root folder of the project (up two levels from the current directory).
   */
  PROJECT_ROOT = join(__dirname, '../..');

  /**
   * The current environment.
   * The default environment is `dev`, which can be overriden by the `--env` flag when running `npm start`.
   */
  ENV = getEnvironment();

  /**
   * The flag for the debug option of the application.
   * The default value is `false`, which can be overriden by the `--debug` flag when running `npm start`.
   * @type {boolean}
   */
  DEBUG = argv['debug'] || false;

  /**
   * The path for the base of the application at runtime.
   * The default path is `/`, which can be overriden by the `--base` flag when running `npm start`.
   * @type {string}
   */
  APP_BASE = argv['base'] || '/';

  /**
   * The default title of the application as used in the `<title>` tag of the
   * `index.html`.
   * @type {string}
   */
  APP_TITLE = 'Welcome to angular2-seed!';

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
   * The base folder for built files.
   * @type {string}
   */
  DIST_DIR = 'dist';

  /**
   * The version of the application as defined in the `package.json`.
   */
  VERSION = appVersion();

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
   * The list of editor temporary files to ignore in watcher and asset builder.
   * @type {string[]}
   */
  TEMP_FILES: string[] = [
    '**/*___jb_tmp___',
    '**/*~',
  ];

  /**
   * Recursively merge source onto target.
   * @param {any} target The target object (to receive values from source)
   * @param {any} source The source object (to be merged onto target)
   */
  mergeObject(target: any, source: any) {
    const deepExtend = require('deep-extend');
    deepExtend(target, source);
  }

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
