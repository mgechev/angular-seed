import karma = require('karma');
import path = require('path');

const join = path.join;
const karmaServer = karma.server;

export = function () {
  return function (done) {
    karmaServer.start({
      configFile: join(process.cwd(), 'karma.conf.js'),
      singleRun: true
    }, done);
  };
};
