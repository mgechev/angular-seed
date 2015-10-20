import * as async from 'async';
import * as del from 'del';
import {join} from 'path';
import {PATH} from '../config';

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
  del(PATH.dest.all, done);
}
function cleanTest(done) {
  del(PATH.dest.test, done);
}
function cleanTmp(done) {
  del(join(PATH.dest.tmp), done);
}
