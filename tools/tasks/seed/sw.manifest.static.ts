import * as gulp from 'gulp';
import { gulpAddStaticFiles } from '@angular/service-worker/build/gulp';
import Config from '../../config';
import { join } from 'path';

export = () => {
  return gulp.src([join(Config.APP_SRC, 'ngsw-manifest.json')])
    .pipe(gulpAddStaticFiles(gulp.src([
      join(Config.APP_DEST, '**', '*'),
      '!' + join(Config.APP_DEST, 'ngsw-manifest.json')
    ], { nodir: true })))
    .pipe(gulp.dest(Config.APP_DEST));
};
