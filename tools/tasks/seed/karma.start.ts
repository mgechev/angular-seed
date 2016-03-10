import * as karma from 'karma';
import {join} from 'path';

export = (done: any) => {
  new (<any>karma).Server({
    configFile: join(process.cwd(), 'karma.conf.js'),
    singleRun: true
  }).start(done);
}
