import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import {loadTasks} from './tools/utils';
import {SEED_TASKS_DIR, PROJECT_TASKS_DIR} from './tools/config';

loadTasks(SEED_TASKS_DIR);
loadTasks(PROJECT_TASKS_DIR);


// --------------
// Build dev.
gulp.task('build.dev', done =>
  runSequence('clean.dev',
              'tslint',
              'build.assets.dev',
              'build.js.dev',
              'build.index.dev',
              done));

// --------------
// Build dev watch.
gulp.task('build.dev.watch', done =>
  runSequence('build.dev',
              'watch.dev',
              done));

// --------------
// Build e2e.
gulp.task('build.e2e', done =>
  runSequence('clean.dev',
              'tslint',
              'build.assets.dev',
              'build.js.e2e',
              'build.index.dev',
              done));

// --------------
// Build prod.
gulp.task('build.prod', done =>
  runSequence('clean.prod',
              'tslint',
              'build.assets.prod',
              'build.html_css.prod',
              'build.js.prod',
              'build.bundles',
              'build.bundles.app',
              'build.index.prod',
              done));

// --------------
// Build test.
gulp.task('build.test', done =>
  runSequence('clean.dev',
              'tslint',
              'build.assets.dev',
              'build.js.test',
              'build.index.dev',
              done));

// --------------
// Build test watch.
gulp.task('build.test.watch', done =>
  runSequence('build.test',
              'watch.test',
              done));

// --------------
// Build tools.
gulp.task('build.tools', done =>
  runSequence('clean.tools',
              'build.js.tools',
              done));

// --------------
// Docs
gulp.task('docs', done =>
  runSequence('build.docs',
              'serve.docs',
              done));

// --------------
// Serve dev
gulp.task('serve.dev', done =>
  runSequence('build.dev',
              'server.start',
              'watch.dev',
              done));

// --------------
// Serve e2e
gulp.task('serve.e2e', done =>
  runSequence('build.e2e',
              'server.start',
              'watch.e2e',
              done));

// --------------
// Test.
gulp.task('test', done =>
  runSequence('build.test',
              'karma.start',
              done));

gulp.task('prod', done =>
  runSequence('serve.prod',
    done));
