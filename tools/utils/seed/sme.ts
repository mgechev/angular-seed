import * as util from 'gulp-util';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

import Config from '../../config';

/**
 * Creates a source-map-explorer report with the given task name.
 * @param {string} taskName - The name of the task.
 */
export function createSME(taskName: string) {
  return (): void => {
    let exec = require('child_process').exec;
    let sme = './node_modules/.bin/source-map-explorer';

    let task = taskName.replace(/\./g, '_');
    let outFileName = `${Config.SME_OUT_FILE_NAME}_${task}_${now()}.${Config.SME_OUT_FORMAT}`;
    let out = join(Config.SME_DIR, outFileName);

    let appBundle = join(Config.JS_DEST, Config.JS_PROD_APP_BUNDLE);
    let appBundleMap = `${appBundle}.map`;

    if (!existsSync(Config.SME_DIR)) {
      mkdirSync(Config.SME_DIR);
    }
    exec(`${sme} --${Config.SME_OUT_FORMAT} ${appBundle} ${appBundleMap} > ${out}`,
      (error: Error, stdout: string, stderr: string) => {
        if (error !== null) {
          console.error(util.colors.red.bold('source-map-explorer error: ' + error + stderr));
          process.exit(1);
        }
      });
  };
}

function now(): string {
  let date = new Date();
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .replace(/[:.]/g, '_');
}
