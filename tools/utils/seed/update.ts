import {Clone} from 'nodegit';
import * as chalk from 'chalk';
import * as path from 'path';
import * as util from 'gulp-util';
import {PROJECT_ROOT, TMP_DIR, SEED_REPOSITORY_URL} from '../../config';

const REPO_DEST = path.join(PROJECT_ROOT, TMP_DIR);

const SOURCE_TOOLS_DIR = path.join(REPO_DEST, 'tools');
const SOURCE_TASKS_DIR = path.join(SOURCE_TOOLS_DIR, 'tasks');
const SOURCE_UTILS_DIR = path.join(SOURCE_TOOLS_DIR, 'utils');
const SOURCE_CONFIG_DIR = path.join(SOURCE_TOOLS_DIR, 'config');

const TARGET_TOOLS_DIR = path.join(PROJECT_ROOT, 'tools');
const TARGET_TASKS_DIR = path.join(TARGET_TOOLS_DIR, 'tasks');
const TARGET_UTILS_DIR = path.join(TARGET_TOOLS_DIR, 'utils');
const TARGET_CONFIG_DIR = path.join(TARGET_TOOLS_DIR, 'config');
const mv: any = require('mv');

Clone(SEED_REPOSITORY_URL, REPO_DEST, {
  depth: 1
})
.then(processUpdate)
.catch((error: any) => util.log(chalk.bgRed.white('We weren\'t able to clone the angular2-seed.')));

function processUpdate() {
  copyData(SOURCE_TASKS_DIR, TARGET_TASKS_DIR);
  copyData(SOURCE_UTILS_DIR, TARGET_UTILS_DIR);
  copyData(SOURCE_CONFIG_DIR, TARGET_CONFIG_DIR);
  updateDependencies();
}

function copyData(src: string, dest: string) {
  mv(src, dest, (error: any) => {
    if (error) {
      util.log(chalk.bgRed.white(`Seed update failed. Unable to move ${src} to ${dest}.`));
    } else {
      util.log(chalk.green(`Successfully override ${dest} with ${src}.`));
    }
  });
}

function updateDependencies() {
  
}

