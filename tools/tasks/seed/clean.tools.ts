import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as rimraf from 'rimraf';
import {readdirSync, lstatSync} from 'fs';
import {join} from 'path';
import {TOOLS_DIR} from '../../config';

export = (done: any) => {
  deleteAndWalk(TOOLS_DIR);
  done();
}

function walk(path: any) {
  let files = readdirSync(path);
  for (let i = 0; i < files.length; i += 1) {
    let curPath = join(path, files[i]);
    if (lstatSync(curPath).isDirectory()) { // recurse
      deleteAndWalk(curPath);
    }
  }
}

function deleteAndWalk(path: any) {
  try {
    rimraf.sync(join(path, '*.js'));
    util.log('Deleted', chalk.yellow(`${path}/*.js`));
  } catch (e) {
    util.log('Error while deleting', chalk.yellow(`${path}/*.js`), e);
  }
  walk(path);
}
