import * as gulp from "gulp";
import * as gulpLoaderPlugins from "gulp-load-plugins";
import * as _runSequence from "run-sequence";
import {readdirSync, existsSync, lstatSync} from "fs";
import {join} from "path";
import {TOOLS_DIR} from "../config";

const TASKS_PATH = join(TOOLS_DIR, "tasks");

export function task(taskname: string, option?: string) {
  return require(join("..", "tasks", taskname))(gulp, gulpLoaderPlugins(), option);
}

export function runSequence(...sequence: any[]) {
  let tasks = [];
  let _sequence = sequence.slice(0);
  sequence.pop();

  scanDir(TASKS_PATH, taskname => tasks.push(taskname));

  sequence.forEach(task => {
    if (tasks.indexOf(task) > -1) { registerTask(task); }
  });

  return _runSequence(..._sequence);
}

function registerTask(taskname: string, filename?: string, option: string = ""): void {
  gulp.task(taskname, task(filename || taskname, option));
}

// todo: add recursive lookup ? or enforce pattern file + folder (ie ./tools/utils & ./tools/utils.ts )
function scanDir(root: string, cb: (taskname: string) => void) {
  if (!existsSync(root)) { return; };

  walk(root);

  function walk(path) {
    let files = readdirSync(path);
    for (let i = 0; i < files.length; i += 1) {
      let file = files[i];
      let curPath = join(path, file);
      // if (lstatSync(curPath).isDirectory()) { // recurse
      //   path = file;
      //   walk(curPath);
      // }
      if (lstatSync(curPath).isFile() && /\.ts$/.test(file)) {
        let taskname = file.replace(/(\.ts)/, "");
        cb(taskname);
      }
    }
  }
}
