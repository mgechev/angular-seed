import {join} from 'path';
import * as runSequence from 'run-sequence';
import {notifyLiveReload, serveSPA} from '../utils';
import {PATH} from '../workflow.config';

export = function serveDev(gulp, plugins) {
  return function () {
    plugins.watch(join(PATH.src.all, '**'), e =>
      runSequence('build.app.dev', () => notifyLiveReload(e))
    );

    serveSPA('dev');
  };
};
