import * as util from 'gulp-util';
import * as runSequence from 'run-sequence';

import { join } from 'path';

let fs = require('fs');


// if gulpfile.ts has been compiled then we need to rebuild the toolchain

export = (done: any) => {

  let checkFile = join(process.cwd(), 'tools', 'config.js');

  // need to require the build.toolchain task as it won't be able to run after we run clear.files
  let buildTools = require('./build.tools');

  try {
    fs.accessSync(checkFile, fs.F_OK);
    util.log('Gulpfile has previously been compiled, rebuilding toolchain');
    runSequence('clean.tools');
    util.log('Running \'build.tools\'');
    buildTools(done);

  } catch (e) {
    util.log('Tools not compiled, skipping rebuild');
    done();
  }

};
