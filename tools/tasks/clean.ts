import * as async from 'async';
import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as del from 'del';
import {APP_DEST, TEST_DEST, TMP_DIR} from '../config';

export = function clean(gulp, plugins, option) {
  return function (done) {

    switch(option) {
      case 'all'    : cleanAll(done);     break;
      case 'dist'   : cleanDist(done);    break;
      case 'test'   : cleanTest(done);    break;
      case 'tmp'    : cleanTmp(done);     break;
      default: done();
    }

  };
};

function cleanAll(done) {
  async.parallel([
    cleanDist,
    cleanTest,
    cleanTmp
  ], done);
}
function cleanDist(done) {
  del(APP_DEST).then((paths) => {
    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
    done();
  });
}
function cleanTest(done) {
  del(TEST_DEST).then((paths) => {
    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
    done();
  });
}
function cleanTmp(done) {
  del(TMP_DIR).then((paths) => {
    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
    done();
  });
}
