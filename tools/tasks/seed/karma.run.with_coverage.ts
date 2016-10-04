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
  return repeatableStartKarma(done, {
    preprocessors: {
      'dist/**/!(*spec|index|*.module|*.routes).js': ['coverage']
    },
    reporters: ['mocha', 'coverage', 'karma-remap-istanbul'],
    coverageReporter: {
      dir: 'coverage_js/',
      reporters: [
        { type: 'json', subdir: '.', file: 'coverage-final.json' },
        { type: 'html', subdir: '.' }
      ]
    },
    remapIstanbulReporter: {
      reports: {
        html: Config.COVERAGE_DIR
      }
    },
    singleRun: true
  });
};
