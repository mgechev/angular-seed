export = function check(gulp, plugins, option) {
  return function () {
    let exec = require('child_process').exec;
    let semver = require('semver');

    exec('npm --version',
      function (error, stdout, stderr) {
        if (error !== null) {
          throw new Error('npm preinstall error: ' + error + stderr);
        }

        if (!semver.gte(stdout, option.npm)) {
          throw new Error('NPM is not in required version! Required is ' + option.npm + ' and you\'re using ' + stdout);
        }
      });

    exec('node --version',
      function (error, stdout, stderr) {
        if (error !== null) {
          throw new Error('npm preinstall error: ' + error + stderr);
        }

        if (!semver.gte(stdout, option.node)) {
          throw new Error('NODE is not in required version! Required is ' + option.node + ' and you\'re using ' + stdout);
        }
      });
  };
}
