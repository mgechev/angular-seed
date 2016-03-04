import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as del from 'del';

export function clean(paths: string|string[]): (done: () => void) => void {
  return done => {
    del(<any>paths).then((paths) => {
      util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
      done();
    });
  };
}
