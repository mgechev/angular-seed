import * as gulp from 'gulp';

import * as gulpLoadPlugins from 'gulp-load-plugins';

import { CHANGELOG_FILE } from '../../config';

const plugins = <any>gulpLoadPlugins({
    rename: {
         'gulp-conventional-changelog': 'changelog'
    }
});

/**
 * Executes the build process, generating the manifest file using `angular2-service-worker`.
 */
export = () => {

    return _input()
        .pipe(_generateChangelog())
        .pipe(_output());

    function _input() {
        return gulp.src(CHANGELOG_FILE);
    }

    function _generateChangelog() {
        return plugins.changelog({
            preset: 'angular'
        });
    }

    function _output() {
        return gulp.dest('.');
    }

};
