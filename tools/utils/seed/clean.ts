import * as colors from 'ansi-colors';
import * as log from 'fancy-log';
import { relative, normalize } from 'path';
import * as rimraf from 'rimraf';

import Config from '../../config';

/**
 * Cleans the given path(s) using `rimraf`.
 * @param {string | string[]} paths - The path or list of paths to clean.
 */
export function clean(paths: string | string[]): (done: () => void) => void {
  return done => {
    let pathsToClean: string[];
    if (paths instanceof Array) {
      pathsToClean = paths;
    } else {
      pathsToClean = [<string>paths];
    }

    const promises = pathsToClean.map(p => {
      return new Promise(resolve => {
        const relativePath: string = relative(Config.PROJECT_ROOT, p);
        if (relativePath.startsWith('..')) {
          log(colors.bgRed.white(`Cannot remove files outside the project root but tried "${normalize(p)}"`));
          process.exit(1);
        } else {
          rimraf(p, e => {
            if (e) {
              log('Clean task failed with', e);
            } else {
              log('Deleted', colors.yellow(p || '-'));
            }
            resolve();
          });
        }
      });
    });
    Promise.all(promises).then(() => (done || (() => 1))())
      .catch(e => log(colors.red(`Error while removing files "${[].concat(paths).join(', ')}", ${e}`)));
  };
}

