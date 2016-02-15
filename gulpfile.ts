import * as gulp from 'gulp';
import {runSequence, task} from './tools/utils';

// --------------
// Clean (override).
gulp.task('clean', task('clean'));

gulp.task('check.versions', task('check.versions'));
gulp.task('build.docs', task('build.docs'));
gulp.task('serve.docs', task('serve.docs'));

// --------------
// Postinstall.
gulp.task('postinstall', done =>
  runSequence('clean',
              'npm',
              done));

// --------------
// Build dev.
gulp.task('build.dev', done =>
  runSequence('clean',
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
    runSequence('clean',
        'tslint',
        'build.assets.dev',
        'build.js.e2e',
        'build.index.dev',
        done));

// --------------
// Build prod.
gulp.task('build.prod', done =>
  runSequence('clean',
              'tslint',
              'build.assets.prod',
              'build.html_css.prod',
              'build.js.prod',
              'build.bundles',
              'build.index.prod',
              done));

// --------------
// Build test.
gulp.task('build.test', done =>
    runSequence('clean',
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
// Docs
// Disabled until https://github.com/sebastian-lenz/typedoc/issues/162 gets resolved
gulp.task('docs', done =>
  runSequence('build.docs',
              'serve.docs',
              done));

// --------------
// Serve.
gulp.task('serve', done =>
  runSequence('build.dev',
              'server.start',
              'watch.serve',
              done));

// --------------
// Serve E2E
gulp.task('serve.e2e', done =>
  runSequence('build.e2e',
              'server.start',
              'watch.serve',
              done));

// --------------
// Test.
gulp.task('test', done =>
  runSequence('build.test',
              'karma.start',
              done));
