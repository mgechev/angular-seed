import * as util from 'gulp-util';
import { join } from 'path';

const fs = require('fs');


// if gulpfile.ts has been compiled then we need to rebuild the toolchain

export = (done: any) => {

  const checkFile = join(process.cwd(), 'tools', 'config.js');

  // need to require the build.toolchain task as it won't be able to run after we run clear.files
  const buildTools = require('./build.tools');
  const cleanTools = require('./clean.tools');

  let rebuild = false;

  try {
    fs.accessSync(checkFile, fs.F_OK);
    util.log('Gulpfile has previously been compiled, rebuilding toolchain');
    rebuild = true;

  } catch (e) {
    util.log('Tools not compiled, skipping rebuild');
    done();
  }

  // continue here to prevent other errors being caught...
  if (rebuild) {
    util.log('Running \'clean.tools\' from check.tools');
    cleanTools();

    util.log('Running \'build.tools\' from check.tools');
    const build = buildTools();

    build.on('end', done);

  }

};
