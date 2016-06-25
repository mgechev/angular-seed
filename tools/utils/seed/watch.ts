import * as gulp from 'gulp';
import { join } from 'path';
import * as runSequence from 'run-sequence';

import { APP_SRC, TEMP_FILES } from '../../config';
import { notifyLiveReload } from '../../utils';

/**
 * Watches the task with the given taskname.
 * @param {string} taskname - The name of the task.
 */
export function watch(taskname: string) {
  return function() {
    let paths: string[] = [
      join(APP_SRC, '**')
    ].concat(TEMP_FILES.map((p) => { return `!${ p }`; }));

    gulp.watch(paths, (e: any) =>
      runSequence(taskname, () => notifyLiveReload(e))
    );
  };
}
