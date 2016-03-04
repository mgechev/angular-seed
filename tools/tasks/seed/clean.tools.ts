import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as del from 'del';
import {readdirSync, lstatSync} from 'fs';
import {join} from 'path';
import {TOOLS_DIR} from '../../config';

export = done => {
  deleteAndWalk(TOOLS_DIR);
  done();
}

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
