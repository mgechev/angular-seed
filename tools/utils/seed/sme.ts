import { exec } from 'child_process';
import * as util from 'gulp-util';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

import Config from '../../config';

const isWin = /^win/.test(process.platform);

/**
 * Creates a source-map-explorer report with the given task name.
 * @param {string} taskName - The name of the task.
 */
export function createSME(taskName: string) {
  return (): void => {
    let sme = './node_modules/.bin/source-map-explorer';

    if (isWin) {
      sme = '.\\node_modules\\.bin\\source-map-explorer.cmd';
    }

    const task = taskName.replace(/\./g, '_');
    const outFileName = `${task}_${now()}.${Config.SME_OUT_FORMAT}`;
    const out = join(Config.SME_DIR, outFileName);

    const appBundle = join(Config.JS_DEST, Config.JS_PROD_APP_BUNDLE);
    const appBundleMap = `${appBundle}.map`;

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
  const date = new Date();
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .replace(/[:.]/g, '_');
}
