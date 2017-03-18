import { existsSync, lstatSync, readFileSync, readdirSync } from 'fs';
import * as runSequence from 'run-sequence';
import * as gulp from 'gulp';
import * as util from 'gulp-util';
import * as isstream from 'isstream';
import { join } from 'path';
import * as tildify from 'tildify';

import { changeFileManager } from './code_change_tools';
import { Task } from '../../tasks/task';

/**
 * Loads the tasks within the given path.
 * @param {string} path - The path to load the tasks from.
 */
export function loadTasks(path: string): void {
  util.log('Loading tasks folder', util.colors.yellow(path));
  readDir(path, taskname => registerTask(taskname, path));
}

function validateTasks(tasks: any) {
  return Object.keys(tasks)
    .map((taskName: string) => {
       if (!tasks[taskName] ||
        !Array.isArray(tasks[taskName]) ||
        tasks[taskName].some((t: any) => typeof t !== 'string')) {
         return taskName;
       }
       return null;
    }).filter((taskName: string) => !!taskName);
}

function registerTasks(tasks: any) {
  Object.keys(tasks)
    .forEach((t: string) => {
      gulp.task(t, (done: any) => runSequence.apply(null, [...tasks[t], done]));
    });
}

function getInvalidTaskErrorMessage(invalid: string[], file: string) {
  let error = `Invalid configuration in "${file}. `;
  if (invalid.length === 1) {
    error += 'Task';
  } else {
    error += 'Tasks';
  }
  error += ` ${invalid.map((t: any) => `"${t}"`).join(', ')} do not have proper format.`;
  return error;
}

/**
 * Defines complex, composite tasks. The composite tasks
 * are simply a composition of another tasks.
 * Each composite tasks has the following format:
 *
 * "composite_task": ["task1", "task2"]
 *
 * This means that the format should be flat, with no nesting.
 *
 * The existing composite tasks are defined in
 * "tools/config/seed.tasks.json" and can be overriden by
 * editing the composite tasks project configuration.
 *
 * By default it is located in: "tools/config/project.tasks.json".
 *
 * Override existing tasks by simply providing a task
 * name and a list of tasks that this task hould execute.
 *
 * For instance:
 * ```
 * {
 *  "test": [
 *    "build.test",
 *    "mocha.run"
 *  ]
 * }
 * ```
 *
 * Note that the tasks do not support nested objects.
 */
export function loadCompositeTasks(seedTasksFile: string, projectTasksFile: string): void {
  let seedTasks: any;
  let projectTasks: any;
  try {
    seedTasks = JSON.parse(readFileSync(seedTasksFile).toString());
    projectTasks = JSON.parse(readFileSync(projectTasksFile).toString());
  } catch (e) {
    util.log('Cannot load the task configuration files: ' + e.toString());
    return;
  }
  [[seedTasks, seedTasksFile], [projectTasks, projectTasksFile]]
    .forEach(([tasks, file]: [string, string]) => {
      const invalid = validateTasks(tasks);
      if (invalid.length) {
        const errorMessage = getInvalidTaskErrorMessage(invalid, file);
        util.log(util.colors.red(errorMessage));
        process.exit(1);
      }
    });
  const mergedTasks = Object.assign({}, seedTasks, projectTasks);
  registerTasks(mergedTasks);
}

function normalizeTask(task: any, taskName: string) {
  if (task instanceof Task) {
    return task;
  }
  if (task.prototype && task.prototype instanceof Task) {
    return new task();
  }
  if (typeof task === 'function') {
    return new class AnonTask extends Task {
      run(done: any) {
        if (task.length > 0) {
          return task(done);
        }

        const taskReturnedValue = task();
        if (isstream(taskReturnedValue)) {
          return taskReturnedValue;
        }

        done();
      }
    };
  }
  throw new Error(taskName + ' should be instance of the class ' +
    'Task, a function or a class which extends Task.');
}

/**
 * Registers the task by the given taskname and path.
 * @param {string} taskname - The name of the task.
 * @param {string} path     - The path of the task.
 */
function registerTask(taskname: string, path: string): void {
  const TASK = join(path, taskname);
  util.log('Registering task', util.colors.yellow(tildify(TASK)));

  gulp.task(taskname, (done: any) => {
    const task = normalizeTask(require(TASK), TASK);

    if (changeFileManager.pristine || task.shallRun(changeFileManager.lastChangedFiles)) {
      const result = task.run(done, changeFileManager.lastChangedFiles);
      if (result && typeof result.catch === 'function') {
        result.catch((e: any) => {
          util.log(`Error while running "${TASK}"`, e);
        });
      }
      return result;
    } else {
      done();
    }
  });
}

/**
 * Reads the files in the given root directory and executes the given callback per found file.
 * @param {string}   root - The root directory to read.
 * @param {function} cb   - The callback to execute per found file.
 */
function readDir(root: string, cb: (taskname: string) => void) {
  if (!existsSync(root)) {
    return;
  }

  walk(root);

  function walk(path: string) {
    let files = readdirSync(path);
    for (let i = 0; i < files.length; i += 1) {
      let file = files[i];
      let curPath = join(path, file);
      if (lstatSync(curPath).isFile() && /\.ts$/.test(file)) {
        let taskname = file.replace(/\.ts$/, '');
        cb(taskname);
      }
    }
  }
}
