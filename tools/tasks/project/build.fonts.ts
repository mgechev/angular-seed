import * as gulp from 'gulp';
import Config from '../../config';

export = () => {
    return gulp.src(Config.FONTS_SRC)
        .pipe(gulp.dest(Config.FONTS_DEST));
};