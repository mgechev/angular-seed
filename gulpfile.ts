import * as gulp from 'gulp';
import { runSequence, task } from './tools/utils';

gulp.task('echo', task('echo', ''));
gulp.task('clean.dist', task('clean', 'dist'));
gulp.task('clean.tmp', task('clean', 'tmp'));
gulp.task('clean.server', task('clean', 'server'));


gulp.task('build.dev', done =>
  runSequence('clean.dist',
              'clean.server',
              'tslint',
              // 'build.sass.dev',
              'build.assets.dev',
              'build.js.dev',
              //'build.e2e_test',
              'build.index.dev',
              'build.server',
              done));

gulp.task('build.prod', done =>
  runSequence('clean.dist',
              'clean.tmp',
              // 'clean.server',
              'tslint',
              // 'build.sass.dev',
              'build.assets.prod',
              'build.html_css.prod',
              'build.js.prod',
              'build.bundles',
              'build.bundles.app',
              'build.index.prod',
              // 'copy.bootstrap.fonts.prod',
              'build.server',
              done));
