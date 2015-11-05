import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import {ENV, PATH} from './tools/config';
import {
  autoRegisterTasks,
  registerInjectableAssetsRef,
  task
} from './tools/utils';


// --------------
// Configuration.
autoRegisterTasks();

registerInjectableAssetsRef(PATH.src.jslib_inject, PATH.dest.dev.lib);
registerInjectableAssetsRef(PATH.src.csslib, PATH.dest.dev.css);

// --------------
// Clean (override).
gulp.task('clean',       task('clean', 'all'));
gulp.task('clean.dist',  task('clean', 'dist'));
gulp.task('clean.test',  task('clean', 'test'));

// --------------
// Postinstall.
gulp.task('postinstall', done =>
  runSequence('clean',
              'npm',
              done));

// --------------
// Build dev.
gulp.task('build.dev', done =>
  runSequence('clean.dist',
              'tslint',
              'build.jslib.dev',
              'build.sass.dev',
              'build.js.dev',
              'build.csslib.dev',
              'build.assets',
              'build.fonts',
              'build.index.dev',
              done));

gulp.task('build.dev.watch', done =>
  runSequence('build.dev',
              'watch.dev',
              done));

gulp.task('build.test.watch', done =>
  runSequence('build.test',
              'watch.test',
              done));

// --------------
// Test.
gulp.task('test', done =>
  runSequence('clean.test',
              'tslint',
              'build.test',
              'karma.start',
              done));

// --------------
// Serve.
gulp.task('serve', done =>
  runSequence(`build.${ENV}`,
              'server.start',
              'watch.serve',
              done));

// --------------
// Docs
gulp.task('docs', done =>
  runSequence('build.docs',
              'serve.docs',
              done));

// --------------
// Build prod.
// To be implemented (https://github.com/mgechev/angular2-seed/issues/58)
// Will start implementation when Angular 2 will get close to a stable release.
