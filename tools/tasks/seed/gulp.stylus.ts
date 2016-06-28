import * as gulp from 'gulp';
let stylus = require('gulp-stylus');
import { join } from 'path';

import { APP_DEST, APP_SRC } from '../../config';

// Make Stylus to CSS

export = () => {
    let paths: string[] = [
       join(APP_SRC, '**/*.styl'), // Pick out all the stylus files
    ];
       return gulp.src(paths)
    .pipe(stylus())
    .pipe(gulp.dest(APP_DEST))
};

