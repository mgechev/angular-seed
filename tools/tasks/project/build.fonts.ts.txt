// New file to add external fonts

import * as gulp from 'gulp';
import {FONTS_SRC, FONTS_DEST} from '../../config';

export = () => {
return gulp.src(FONTS_SRC)
      .pipe(gulp.dest(FONTS_DEST));
}
