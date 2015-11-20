import * as async from 'async';
import * as del from 'del';
import {APP_DEST, TEST_DEST} from '../config';

export = function clean(gulp, plugins, option) {
  return function (done) {

    switch(option) {
      case 'all'    : cleanAll(done);     break;
      case 'dist'   : cleanDist(done);    break;
      case 'test'   : cleanTest(done);    break;
      default: done();
    }

  };
};

function cleanAll(done) {
  async.parallel([
    cleanDist,
    cleanTest
  ], done);
}
function cleanDist(done) {
  del(APP_DEST, done);
}
function cleanTest(done) {
  del(TEST_DEST, done);
}
