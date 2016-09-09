import { RELEASE_DIR, CHANGELOG_FILE, PACKAGE_FILE, GIT_CONFIG } from '../../config';

import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';

const plugins = <any>gulpLoadPlugins();

export = () => {

    return gulp.src([
        RELEASE_DIR + '/**/*',
        CHANGELOG_FILE,
        PACKAGE_FILE
    ])
    .pipe(plugins.git.add())
    .pipe(plugins.git.commit(GIT_CONFIG.release_commit_message));
};
