import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import * as runSequence from 'run-sequence';

import Config from '../../config';
import { changeFileManager } from './code_change_tools';
import { notifyLiveReload } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Watches the task with the given taskname.
 * @param {string} taskname - The name of the task.
 */
export function watch(taskname: string, root: string = Config.APP_SRC) {
  return function () {
    let paths: string[] = [
      join(root, '**')
    ].concat(Config.TEMP_FILES.map((p) => { return '!' + p; }));

    // watches for user defined paths to trigger compilation
    if (Config.EXTRA_WATCH_PATHS) {
      paths = paths.concat(Config.EXTRA_WATCH_PATHS.map((p) => {
        return join(p, '**');
      }));
    }

    plugins.watch(paths, (e: any) => {
      changeFileManager.addFile(e.path);


      // Resolves issue in IntelliJ and other IDEs/text editors which
      // save multiple files at once.
      // https://github.com/mgechev/angular-seed/issues/1615 for more details.
      setTimeout(() => {

        runSequence(taskname, () => {
          changeFileManager.clear();
          notifyLiveReload(e);
        });

      }, 100);
    });
  };
}
