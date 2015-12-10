import {VERSION_NPM, VERSION_NODE} from '../config';

function reportError(message: string) {
  console.error(require('chalk').white.bgRed.bold(message));
  process.exit(1);
}

module.exports = function check(gulp, plugins) {
  return function () {
    let exec = require('child_process').exec;
    let semver = require('semver');

    exec('npm --version',
      function (error, stdout, stderr) {
        if (error !== null) {
          reportError('npm preinstall error: ' + error + stderr);
        }

        if (!semver.gte(stdout, VERSION_NPM)) {
          reportError('NPM is not in required version! Required is ' + VERSION_NPM + ' and you\'re using ' + stdout);
        }
      });

    exec('node --version',
      function (error, stdout, stderr) {
        if (error !== null) {
          reportError('npm preinstall error: ' + error + stderr);
        }

        if (!semver.gte(stdout, VERSION_NODE)) {
          reportError('NODE is not in required version! Required is ' + VERSION_NODE + ' and you\'re using ' + stdout);
        }
      });
  };
};
