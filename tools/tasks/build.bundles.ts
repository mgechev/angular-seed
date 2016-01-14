import * as merge from 'merge-stream';
import {join} from 'path';
import * as browserify from 'browserify';
import {
  PROD_DEPENDENCIES,
  JS_PROD_SHIMS_BUNDLE,
  JS_PROD_APP_BUNDLE,
  JS_DEST,
  TMP_DIR
} from '../config';

export = function bundles(gulp, plugins) {
  return function () {

    return merge(bundleShims(), bundleApp());

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

    function bundleApp() {
      return browserify(join(TMP_DIR, 'main'))
        .bundle()
        .pipe(require('vinyl-source-stream')(JS_PROD_APP_BUNDLE))
        .pipe(require('vinyl-buffer')())
        .pipe(plugins.uglify({
          mangle: false
        }))
        .pipe(gulp.dest(JS_DEST));
    }
  };
};
