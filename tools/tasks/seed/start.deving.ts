import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';

import { notifyLiveReload, watchAppFiles } from '../../utils';

gulp.task('watch.while_deving', function () {
  watchAppFiles('**/!(*.ts)', (e: any, done: any) =>
    runSequence('build.assets.dev', 'build.html_css', 'build.index.dev', () => { notifyLiveReload(e); done(); }));
  watchAppFiles('**/(*.ts)', (e: any, done: any) =>
    runSequence('build.js.dev', 'build.index.dev', () => {
      notifyLiveReload(e);
      runSequence('build.js.test', 'karma.run.with_coverage', done);
    }));
});

export = (done: any) =>
  runSequence('build.test',
    'watch.while_deving',
    'server.start',
    'karma.run.with_coverage',
    'serve.coverage.watch',
    done);
