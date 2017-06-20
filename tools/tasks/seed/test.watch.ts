import * as gulp from 'gulp';
import { join } from 'path';
import * as runSequence from 'run-sequence';

import Config from '../../config';
import { notifyLiveReload, watchAppFiles } from '../../utils';

gulp.task('watch.while_testing', function () {
  watchAppFiles('**/!(*.ts)', (e: any, done: any) =>
    runSequence('build.assets.dev', 'build.html_css', 'build.index.dev', done));
  watchAppFiles('**/(*.ts)', (e: any, done: any) =>
    runSequence('build.js.dev', 'build.index.dev', () => {
      runSequence('build.js.test', 'karma.run.without_coverage', done);
    }));
});

export = (done: any) =>
  runSequence('build.test',
    'watch.while_testing',
    'karma.run.without_coverage',
    done);
