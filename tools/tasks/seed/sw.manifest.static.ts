import * as colors from 'ansi-colors';
import * as log from 'fancy-log';
import * as gulp from 'gulp';
import Config from '../../config';
import { join } from 'path';

function reportError(message: string) {
  log.error(colors.white.bgRed.bold(message));
  process.exit(1);
}

export = () => {
  const exec = require('child_process').exec;

  // Create ngsw.json contorl file from config file using
  // @angular/service-worker's NGSW CLI
  const sw = join('node_modules', '.bin', 'ngsw-config');
  const src = join('.', 'src', 'client', 'ngsw-config.json');
  exec(`${sw} ${Config.APP_DEST} ${src}`, function(error: Error, stdout: any, stderr: any) {
    if (error !== null) {
      reportError('Angular Service Worker config error: ' + error + stderr);
    } else {
      log('Angular Service Worker config success');
    }
  });

  // Copy @angular/service-worker's ngsw-worker.js to dist
  return gulp.src(['node_modules/@angular/service-worker/ngsw-worker.js']).pipe(gulp.dest(Config.APP_DEST));
};
