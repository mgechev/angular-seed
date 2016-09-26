import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';

import Config from '../../config';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, bundling the shim files.
 */
export = () => merge(bundleShims());

/**
 * Returns the shim files to be injected.
 */
function getShims() {
  let libs = Config.DEPENDENCIES
    .filter(d => /\.js$/.test(d.src));

  return libs.filter(l => l.inject === 'shims')
    .concat(libs.filter(l => l.inject === 'libs'))
    .concat(libs.filter(l => l.inject === true))
    .map(l => l.src);
}

/**
 * Bundles the shim files.
 */
function bundleShims() {
  return gulp.src(getShims())
    .pipe(plugins.concat(Config.JS_PROD_SHIMS_BUNDLE))
    // Strip the first (global) 'use strict' added by reflect-metadata, but don't strip any others to avoid unintended scope leaks.
    .pipe(plugins.replace(/('|")use strict\1;var Reflect;/, 'var Reflect;'))
    .pipe(gulp.dest(Config.JS_DEST));
}
