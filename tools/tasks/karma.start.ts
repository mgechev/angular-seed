import {server as karma} from 'karma';
import {join} from 'path';

export = function karmaStart() {
  return function (done) {
    karma.start({
      configFile: join(process.cwd(), 'karma.conf.js'),
      singleRun: true
    }, done);
  };
};
