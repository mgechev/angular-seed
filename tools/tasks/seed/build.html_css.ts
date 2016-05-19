import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import { join } from 'path';

import { APP_DEST, APP_SRC, BROWSER_LIST, CSS_DEST, CSS_PROD_BUNDLE, DEPENDENCIES, ENV, TMP_DIR } from '../../config';

const plugins = <any>gulpLoadPlugins();
const cleanCss = require('gulp-clean-css');

const processors = [
  autoprefixer({
    browsers: BROWSER_LIST
  })
];

const isProd = ENV === 'prod';

if (isProd) {
  processors.push(
    cssnano({
      discardComments: {removeAll: true}
    })
  );
}

/**
 * Copies all HTML files in `src/client` over to the `dist/tmp` directory.
 */
function prepareTemplates() {
  return gulp.src(join(APP_SRC, '**', '*.html'))
    .pipe(gulp.dest(TMP_DIR));
}

/**
 * Processes the CSS files within `src/client` excluding those in `src/client/assets` using `postcss` with the
 * configured processors.
 */
function processComponentCss() {
  return gulp.src([
      join(APP_SRC, '**', '*.css'),
      '!' + join(APP_SRC, 'assets', '**', '*.css')
    ])
    .pipe(isProd ? plugins.cached('process-component-css') : plugins.util.noop())
    .pipe(plugins.postcss(processors))
    .pipe(gulp.dest(isProd ? TMP_DIR: APP_DEST));
}

/**
 * Processes the external CSS files using `postcss` with the configured processors.
 */
function processExternalCss() {
  return gulp.src(getExternalCss().map(r => r.src))
    .pipe(isProd ? plugins.cached('process-external-css') : plugins.util.noop())
    .pipe(plugins.postcss(processors))
    .pipe(isProd ? plugins.concatCss(CSS_PROD_BUNDLE) : plugins.util.noop())
    .pipe(isProd ? cleanCss() : plugins.util.noop())
    .pipe(gulp.dest(CSS_DEST));
}

/**
 * Returns the array of external CSS dependencies listed in the application configuration.
 */
function getExternalCss() {
  return DEPENDENCIES.filter(d => /\.css$/.test(d.src));
}

/**
 * Executes the build process, processing the HTML and CSS files.
 */
export = () => merge(processComponentCss(), prepareTemplates(), processExternalCss());
