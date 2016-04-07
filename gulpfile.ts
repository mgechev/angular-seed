import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import {loadTasks} from './tools/utils';
import {SEED_TASKS_DIR, PROJECT_TASKS_DIR} from './tools/config';

loadTasks(SEED_TASKS_DIR);
loadTasks(PROJECT_TASKS_DIR);


// --------------
// Build dev.
gulp.task('build.dev', (done: any) =>
  runSequence('clean.dev',
              'tslint',
              'css-lint',
              'build.assets.dev',
              'build.html_css',
              'build.js.dev',
              'build.index.dev',
              done));

// --------------
// Build dev watch.
gulp.task('build.dev.watch', (done: any) =>
  runSequence('build.dev',
              'watch.dev',
              done));

// --------------
// Build e2e.
gulp.task('build.e2e', (done: any) =>
  runSequence('clean.dev',
              'tslint',
              'build.assets.dev',
              'build.js.e2e',
              'build.index.dev',
              done));

// --------------
// Build prod.
gulp.task('build.prod', (done: any) =>
  runSequence('clean.prod',
              'tslint',
              'css-lint',
              'build.assets.prod',
              'build.html_css',
              'copy.js.prod',
              'build.js.prod',
              'build.bundles',
              'build.bundles.app',
              'build.index.prod',
              done));

// --------------
// Build test.
gulp.task('build.test', (done: any) =>
  runSequence('clean.dev',
              'tslint',
              'build.assets.dev',
              'build.js.test',
              'build.index.dev',
              done));

// --------------
// Build test watch.
gulp.task('build.test.watch', (done: any) =>
  runSequence('build.test',
              'watch.test',
              done));

// --------------
// Build tools.
gulp.task('build.tools', (done: any) =>
  runSequence('clean.tools',
              'build.js.tools',
              done));

// --------------
// Docs
gulp.task('docs', (done: any) =>
  runSequence('build.docs',
              'serve.docs',
              done));

// --------------
// Serve dev
gulp.task('serve.dev', (done: any) =>
  runSequence('build.dev',
              'server.start',
              'watch.dev',
              done));

// --------------
// Serve e2e
gulp.task('serve.e2e', (done: any) =>
  runSequence('build.e2e',
              'server.start',
              'watch.e2e',
              done));


// --------------
// Serve prod
gulp.task('serve.prod', (done: any) =>
  runSequence('build.prod',
              'server.prod',
              done));


// --------------
// Test.
gulp.task('test', (done: any) =>
  runSequence('build.test',
              'karma.start',
              done));

// --------------
// try
import * as express from 'express';
import { protractor, webdriver_update } from 'gulp-protractor';

gulp.task('postinstall', webdriver_update);

function e2eServer({port, dir}) {
  let app = express();

  app.use(express.static(dir));

  return new Promise((resolve) => {
    let server = app.listen(port, () => {
      resolve(server);
    });
  });
}

gulp.task('run.e2e', (done: any) => {
  let opts = {
    port: 5555,
    dir: 'dist/prod'
  };

  e2eServer(opts)
    .then((server: any) => {
      gulp
        .src('./dist/dev/**/*.e2e.js')
        .pipe(protractor({ configFile: 'protractor.conf.js' }))
        .on('error', (error: string) => { throw error; })
        .on('end', () => { server.close(done); });
    });
});
/*
gulp.task('protractor.start', (done: any) =>
  runSequence('build.prod',
              'build.js.e2e',
              'run.e2e',
              done));
*/
