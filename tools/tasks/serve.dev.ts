import runSequence = require('run-sequence');
import utils = require('../utils');
import CONFIG = require('../workflow.config');
import path = require('path');

const PATH = CONFIG.PATH;
const join = path.join;

export = function serveDev(gulp, plugins) {
  return function () {
    plugins.watch(join(PATH.src.all, '**'), e =>
      runSequence('build.app.dev', () => utils.notifyLiveReload(e))
    );

    utils.serveSPA('dev');
  };
};
