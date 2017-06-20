import * as karma from 'karma';
import { join } from 'path';

import Config from '../../config';

let repeatableStartKarma = (done: any, config: any = {}) => {
  return new (<any>karma).Server(Object.assign({
    configFile: join(process.cwd(), 'karma.conf.js'),
    singleRun: true
  }, config), (exitCode: any) => {
    // Karma run is finished but do not exit the process for failure. Rather just mark this task as done.
    done();
  }).start();
};

export = (done: any) => {
  return repeatableStartKarma(done);
};
