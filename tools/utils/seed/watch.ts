import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import * as runSequence from 'run-sequence';

import Config from '../../config';
import { notifyLiveReload } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Watches the task with the given taskname.
 * @param {string} taskname - The name of the task.
 */
export function watch(taskname: string) {
  return function () {
    let paths:string[]=[
      join(Config.APP_SRC,'**')
    ].concat(Config.TEMP_FILES.map((p) => { return '!'+p; }));

    plugins.watch(paths, (e:any) =>
      runSequence(taskname, () => notifyLiveReload(e))
    );
  };
}
