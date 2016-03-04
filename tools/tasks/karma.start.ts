import * as karma from 'karma';
import {join} from 'path';

export = function karmaStart() {
  return function (done) {
    new (<any>karma).Server({
      configFile: join(process.cwd(), 'karma.conf.js'),
      singleRun: true,
      autoWatch: false
    }, done).start();
  };
};
