import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import { join } from 'path';

import {
  APP_DEST,
  APP_SRC,
  BROWSER_LIST,
  CSS_DEST,
  CSS_PROD_BUNDLE,
  DEPENDENCIES,
  ENV,
  getPluginConfig,
  TMP_DIR,
  ENABLE_SCSS
} from '../../config';

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
      discardComments: {removeAll: true},
      discardUnused: false, // unsafe, see http://goo.gl/RtrzwF
      zindex: false, // unsafe, see http://goo.gl/vZ4gbQ
      reduceIdents: false // unsafe, see http://goo.gl/tNOPv0
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
 * Execute the appropriate component-stylesheet processing method based on presence of --scss flag.
 */
function processComponentStylesheets() {
  return ENABLE_SCSS ? processScss('component') : processComponentCss();
}

/**
 * Processes the SCSS files for the specified origin.
 * @param {string} origin The origin of the SCSS files being handled. Must be either 'component' or 'external.'
 */
function processScss(origin: 'component'|'external') {
  let scssSrc = getScssForOrigin(origin);
  let scssDest = getScssDestForOrigin(origin);
  return gulp.src(scssSrc)
    .pipe(isProd ? plugins.cached(`process-${origin}-scss`) : plugins.util.noop())
    .pipe(isProd ? plugins.progeny() : plugins.util.noop())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({includePaths: ['./node_modules/']}).on('error', plugins.sass.logError))
    .pipe(plugins.postcss(processors))
    .pipe(plugins.sourcemaps.write(isProd ? '.' : ''))
    .pipe(gulp.dest(scssDest));
}

/**
 * Get an array of SCSS files belonging to the specified origin.
 * @param {string} origin The origin of the SCSS files being handled. Must be either 'component' or 'external.'
 */
function getScssForOrigin(origin: 'component'|'external') {
  if (origin === 'component') return [join(APP_SRC, '**', '*.scss')]; else {
    return getExternalStylesheets().map(r => r.src);
  }
}

function getExternalStylesheets() {
  let stylesheet = ENABLE_SCSS ? 'scss' : 'css';
  return DEPENDENCIES.filter(d => new RegExp(`\.${stylesheet}$`).test(d.src));
}

/**
 * Get the destination of the processed SCSS files belonging to the specified origin.
 * @param {string} origin The origin of the SCSS files being handled. Must be either 'component' or 'external.'
 */
function getScssDestForOrigin(origin: 'component'|'external') {
  if (origin === 'component') return (isProd ? TMP_DIR : APP_DEST); else {
    return CSS_DEST;
  }
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
    .pipe(gulp.dest(isProd ? TMP_DIR : APP_DEST));
}

/**
 * Execute external-stylesheet processing method based on presence of --scss flag.
 */
function processExternalStylesheets() {
  return ENABLE_SCSS ? processScss('external') : processExternalCss();
}

/**
 * Processes the external CSS files using `postcss` with the configured processors.
 */
function processExternalCss() {
  return gulp.src(getExternalCss().map(r => r.src))
    .pipe(isProd ? plugins.cached('process-external-css') : plugins.util.noop())
    .pipe(plugins.postcss(processors))
    .pipe(isProd ? plugins.concatCss(CSS_PROD_BUNDLE, getPluginConfig('gulp-concat-css')) : plugins.util.noop())
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
export = () => merge(processComponentStylesheets(), prepareTemplates(), processExternalStylesheets());
