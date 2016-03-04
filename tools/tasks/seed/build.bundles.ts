import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import {PROD_DEPENDENCIES, JS_PROD_SHIMS_BUNDLE, JS_DEST} from '../../config';
const plugins = <any>gulpLoadPlugins();

export = () => merge(bundleShims());

function getShims() {
  let libs = PROD_DEPENDENCIES
    .filter(d => /\.js$/.test(d.src));

  return libs.filter(l => l.inject === 'shims')
    .concat(libs.filter(l => l.inject === 'libs'))
    .concat(libs.filter(l => l.inject === true))
    .map(l => l.src);
}

function bundleShims() {
  return gulp.src(getShims())
    // Strip comments and sourcemaps
    .pipe(plugins.uglify({
      mangle: false
    }))
    .pipe(plugins.concat(JS_PROD_SHIMS_BUNDLE))
    .pipe(gulp.dest(JS_DEST));
}
