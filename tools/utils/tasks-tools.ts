import * as gulp from 'gulp';
import * as plugins from 'gulp-load-plugins';
import {readdirSync, existsSync, lstatSync} from 'fs';
import {join} from 'path';
import {PATH} from '../config';

const TASKS_PATH = join(PATH.tools, 'tasks');

export function autoRegisterTasks(): void {
  scanDir(TASKS_PATH, (taskname) => registerTask(taskname));
}

export function task(taskname: string, option?: string) {
  return require(join('..', 'tasks', taskname))(gulp, plugins(), option);
}


// ----------
// Private.

function registerTask(taskname: string, filename?: string, option: string = ''): void {
  gulp.task(taskname, task(filename || taskname, option));
}

// TODO: add recursive lookup ? or enforce pattern file + folder (ie ./tools/utils & ./tools/utils.ts )
function scanDir(root: string, cb: (taskname: string) => void) {
  if (!existsSync(root)) return;

  walk(root);

  function walk(path) {
    readdirSync(path).forEach(function(file) {
      let curPath = join(path, file);
      if (lstatSync(curPath).isDirectory()) { // recurse
        path = file;
        walk(curPath);
      }
      if (lstatSync(curPath).isFile() && file.endsWith('.ts')) {
        let taskname = file.replace(/(\.ts)/, '');
        cb(taskname);
      }
    });
  }
}
