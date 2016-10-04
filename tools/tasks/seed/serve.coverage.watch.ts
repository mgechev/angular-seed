import { join } from 'path';
import * as browserSync from 'browser-sync';

import Config from '../../config';

export = () => {
  let coverageFolder = Config.COVERAGE_DIR;
  let watchedFiles: string[] = [join(coverageFolder, '**')];

  // Serve files from the coverage of this project
  browserSync.create().init({
    server: {
      baseDir: './' + coverageFolder
    },
    port: Config.COVERAGE_PORT,
    files: watchedFiles,
    logFileChanges: false
  });
};
