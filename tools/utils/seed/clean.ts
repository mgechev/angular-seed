import * as util from 'gulp-util';
import * as rimraf from 'rimraf';

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
        rimraf(p, e => {
          if (e) {
            util.log('Clean task failed with', e);
          } else {
            util.log('Deleted', util.colors.yellow(p || '-'));
          }
          resolve();
        });
      });
    });
    Promise.all(promises).then(() => done());
  };
}

