import { lstatSync, readdirSync } from 'fs';
import * as util from 'gulp-util';
import * as rimraf from 'rimraf';
import { join } from 'path';

import Config from '../../config';

/**
 * Executes the build process, deleting all JavaScrip files (which were transpiled from the TypeScript sources) with in
 * the `tools` directory.
 */
export = (done: any) => {
  deleteAndWalk(Config.TOOLS_DIR);
  done();
};

/**
 * Recursively walks along the given path and deletes all JavaScript files.
 * @param {any} path - The path to walk and clean.
 */
function walk(path: any) {
  let files = readdirSync(path);
  for (let i = 0; i < files.length; i += 1) {
    let curPath = join(path, files[i]);
    if (lstatSync(curPath).isDirectory()) { // recurse
      deleteAndWalk(curPath);
    }
  }
}

/**
 * Deletes the JavaScript file with the given path.
 * @param {any} path - The path of the JavaScript file to be deleted.
 */
function deleteAndWalk(path: any) {
  try {
    rimraf.sync(join(path, '*.js'));
    util.log('Deleted', util.colors.yellow(`${path}/*.js`));
  } catch (e) {
    util.log('Error while deleting', util.colors.yellow(`${path}/*.js`), e);
  }
  walk(path);
}
