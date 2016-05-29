import * as karma from 'karma';
import { join } from 'path';

import { APP_SRC } from '../../config';

/**
 * Executes the build process, running all unit tests using `karma`.
 */
export = (done: any) => {
  new (<any>karma).Server({
    configFile: join(process.cwd(), APP_SRC, 'karma.conf.js'),
    singleRun: true
  }).start(done);
};
