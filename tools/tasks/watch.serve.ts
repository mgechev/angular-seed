import * as runSequence from 'run-sequence';
import {join} from 'path';
import {PATH} from '../config';
import {notifyLiveReload} from '../utils';

export = function watchServe(gulp, plugins) {
  return function () {
    plugins.watch(join(PATH.src.all, '**'), e =>
      runSequence('build.dev', () => notifyLiveReload(e))
    );
  };
};
