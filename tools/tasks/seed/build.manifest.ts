import * as gulp from 'gulp';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';
import * as walk from 'walk';
import {APP_DEST, MANIFEST_FILE} from '../../config';

export = () => {
  return require('angular2-service-worker')
    .gulpGenManifest({
      group: [{
        name: 'css',
        sources: gulp.src(`${APP_DEST}/**/*.css`)
      }, {
        name: 'js',
        sources: gulp.src(`${APP_DEST}/**/*.js`)
      }]
    })
    .pipe(gulp.dest(APP_DEST));
};

