import * as runSequence from 'run-sequence';
import {join} from 'path';
import {APP_SRC} from '../config';
import {notifyLiveReload} from '../utils';

export = function watchServe(gulp, plugins) {
  return function () {
    plugins.watch(join(APP_SRC, '**'), e =>
      runSequence('build.dev', () => notifyLiveReload(e))
    );
  };
};
