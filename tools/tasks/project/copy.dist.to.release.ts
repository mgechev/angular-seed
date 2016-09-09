
import * as gulp from 'gulp';

import { RELEASE_DIR, PROD_DEST } from '../../config';

/**
 * Executes the build task, copying all TypeScript files over to the `dist/tmp` directory.
 */
export = () => {
    return gulp.src([PROD_DEST + '/**/*'])
        .pipe(gulp.dest(RELEASE_DIR));
};
