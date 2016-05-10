import * as gulp from 'gulp';

import { APP_DEST } from '../../config';

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
