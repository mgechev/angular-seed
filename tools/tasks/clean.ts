import * as del from 'del';
import {join} from 'path';
import {PATH} from '../config';

export = function clean(gulp, plugins, option) {
  return function (done) {
    let task;

    switch(option) {
      case 'all'    : task = cleanAll();     break;
      case 'dist'   : task = cleanDist();    break;
      case 'test'   : task = cleanTest();    break;
      case 'tmp'    : task = cleanTmp();     break;
      default: return done();
    }

    task
      .then(function() {
        done();
      }).catch(function(error) {
        done(error);
      });
  };
}

function cleanAll() {
  return Promise.all([
    cleanDist(),
    cleanTest(),
    cleanTmp()
  ]);
}

function cleanDist() {
  return del(PATH.dest.all);
}

function cleanTest() {
  return del(PATH.dest.test);
}

function cleanTmp() {
  return del(join(PATH.dest.tmp));
}
