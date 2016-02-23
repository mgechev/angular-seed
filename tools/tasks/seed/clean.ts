import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as del from 'del';
import {readdirSync, lstatSync} from 'fs';
import {join} from 'path';
import {DIST_DIR, DEV_DEST, PROD_DEST, TMP_DIR, TOOLS_DIR} from '../../config';

export = function clean(gulp, plugins, option) {

  return function(done) {
    switch(option) {
      case 'all'  : cleanAll(done);   break;
      case 'dev'  : cleanDev(done);   break;
      case 'prod' : cleanProd(done);  break;
      case 'tools': cleanTools(done); break;
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

function cleanTools(done) {
  del.sync('gulpfile.js');
  deleteAndWalk(TOOLS_DIR);
  done();

  function walk(path) {
    let files = readdirSync(path);
    for (let i = 0; i < files.length; i += 1) {
      let curPath = join(path, files[i]);
      if (lstatSync(curPath).isDirectory()) { // recurse
        deleteAndWalk(curPath);
      }
    }
  }

  function deleteAndWalk(path) {
    del.sync([join(path, '*.js')]);
    util.log('Deleted', chalk.yellow(`${path}/*.js`));
    walk(path);
  }
}
