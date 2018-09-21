import * as colors from 'ansi-colors';
import * as log from 'fancy-log';
import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';

import Config from './tools/config';
import { loadCompositeTasks, loadTasks } from './tools/utils';

loadTasks(Config.SEED_TASKS_DIR);
loadTasks(Config.PROJECT_TASKS_DIR);

loadCompositeTasks(Config.SEED_COMPOSITE_TASKS, Config.PROJECT_COMPOSITE_TASKS);

// --------------
// Clean dev/coverage that will only run once
// this prevents karma watchers from being broken when directories are deleted
let firstRun = true;
gulp.task('clean.once', (done: any) => {
  if (firstRun) {
    firstRun = false;
    runSequence('check.tools', 'clean.dev', 'clean.coverage', done);
  } else {
    log('Skipping clean on rebuild');
    done();
  }
});
