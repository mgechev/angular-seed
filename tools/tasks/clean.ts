import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as del from 'del';
import {DIST_DIR, DEV_DEST, PROD_DEST, TMP_DIR} from '../config';

export = function clean(gulp, plugins, option) {

  return function(done) {
    switch(option) {
      case 'all'  : cleanAll(done);  break;
      case 'dev'  : cleanDev(done);  break;
      case 'prod' : cleanProd(done); break;
      default: done();
    }
  };

};

function cleanAll(done) {
  del(DIST_DIR).then((paths) => {
    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
    done();
  });
}

function cleanDev(done) {
  del(DEV_DEST).then((paths) => {
    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
    done();
  });
}

function cleanProd(done) {
  del([PROD_DEST, TMP_DIR]).then((paths) => {
    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
    done();
  });
}
