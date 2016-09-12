import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { argv } from 'yargs';

const plugins = < any > gulpLoadPlugins();

export = () => {

    return _input()
        .pipe(_bump_version())
        .pipe(_output());
};

//------------------------------------------------------------

function _input() {
    return gulp.src('package.json');
}

function _bump_version() {

    var version: string = argv['set-version'],
        options: any = {
            type: getBumpType()
        };

    if (version) {
        options.version = version;
    }

    return plugins.bump(options);
}

function _output() {
    return gulp.dest('.');
}

function getBumpType() {

    if (argv['major']) {
        return 'major';
    }

    if (argv['minor']) {
        return 'minor';
    }

    if (argv['prerelease']) {
        return 'prerelease';
    }

    return 'patch';
}
