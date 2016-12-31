import * as util from 'gulp-util';
import { relative, normalize } from 'path';
import * as rimraf from 'rimraf';

import Config from '../../config';

/**
 * Cleans the given path(s) using `rimraf`.
 * @param {string or string[]} paths - The path or list of paths to clean.
 */
export function clean(paths: string|string[]): (done: () => void) => void {
  return done => {
    let pathsToClean: string[];
    if (paths instanceof Array) {
      pathsToClean = paths;
    } else {
      pathsToClean = [<string>paths];
    }

    let promises = pathsToClean.map(p => {
      return new Promise(resolve => {
        const relativePath: string = relative(Config.PROJECT_ROOT, p);
        if (relativePath.startsWith('..')) {
          util.log(util.colors.bgRed.white(`Cannot remove files outside the project root but tried "${normalize(p)}"`));
          process.exit(1);
        } else {
          rimraf(p, e => {
            if (e) {
              util.log('Clean task failed with', e);
            } else {
              util.log('Deleted', util.colors.yellow(p || '-'));
            }
            resolve();
          });
        }
      });
    });
    Promise.all(promises).then(() => (done || (() => 1))())
      .catch(e => util.log(util.colors.red(`Error while removing files "${[].concat(paths).join(', ')}", ${e}`)));
  };
}

