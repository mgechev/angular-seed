import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as del from 'del';
import {DIST_DIR} from '../../config';

export function clean(paths) {
  return done => {
    del(DIST_DIR).then((paths) => {
      util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
      done();
    });
  };
}
