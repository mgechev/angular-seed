import * as karma from 'karma';
import { join } from 'path';

/**
 * Executes the build process, running all unit tests using `karma`.
 */
export = (done: any) => {
  new (<any>karma).Server({
    configFile: join(process.cwd(), 'karma.conf.js'),
    singleRun: true
  }).start(done);
};
