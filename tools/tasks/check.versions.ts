import {VERSION_NPM, VERSION_NODE} from '../config';

export = function check(gulp, plugins) {
  return function () {
    let exec = require('child_process').exec;
    let semver = require('semver');

    exec('npm --version',
      function (error, stdout, stderr) {
        if (error !== null) {
          throw new Error('npm preinstall error: ' + error + stderr);
        }

        if (!semver.gte(stdout, VERSION_NPM)) {
          throw new Error('NPM is not in required version! Required is ' + VERSION_NPM + ' and you\'re using ' + stdout);
        }
      });

    exec('node --version',
      function (error, stdout, stderr) {
        if (error !== null) {
          throw new Error('npm preinstall error: ' + error + stderr);
        }

        if (!semver.gte(stdout, VERSION_NODE)) {
          throw new Error('NODE is not in required version! Required is ' + VERSION_NODE + ' and you\'re using ' + stdout);
        }
      });
  };
}
