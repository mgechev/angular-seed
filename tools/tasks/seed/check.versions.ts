import * as colors from 'ansi-colors';
import * as log from 'fancy-log';

import Config from '../../config';

function reportError(message: string) {
  log.error(colors.white.bgRed.bold(message));
  process.exit(1);
}

/**
 * Executes the build process, verifying that the installed NodeJS and NPM version matches the required versions as
 * defined in the application configuration.
 */
export = () => {
  const exec = require('child_process').exec;
  const semver = require('semver');

  exec('npm --version',
    function(error: Error, stdout: any, stderr: any) {
      if (error !== null) {
        reportError('npm preinstall error: ' + error + stderr);
      }

      if (!semver.gte(stdout, Config.VERSION_NPM)) {
    reportError('NPM is not in required version! Required is ' + Config.VERSION_NPM + ' and you\'re using ' + stdout);
      }
    });

  exec('node --version',
    function(error: Error, stdout: any, stderr: any) {
      if (error !== null) {
        reportError('npm preinstall error: ' + error + stderr);
      }

      if (!semver.gte(stdout, Config.VERSION_NODE)) {
    reportError('NODE is not in required version! Required is ' + Config.VERSION_NODE + ' and you\'re using ' + stdout);
      }
    });
};
