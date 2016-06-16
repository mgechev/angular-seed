import * as gulp from 'gulp';

import { WEB_APP_DEST } from '../../../../config';

/**
 * Executes the build process, generating the manifest file using `angular2-service-worker`.
 */
export = () => {
  return require('angular2-service-worker')
    .gulpGenManifest({
      group: [{
        name: 'css',
        sources: gulp.src(`${WEB_APP_DEST}/**/*.css`)
      }, {
        name: 'js',
        sources: gulp.src(`${WEB_APP_DEST}/**/*.js`)
      }]
    })
    .pipe(gulp.dest(WEB_APP_DEST));
};
