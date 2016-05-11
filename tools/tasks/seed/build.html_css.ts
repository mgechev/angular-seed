import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import { join } from 'path';

import { APP_DEST, APP_SRC, BROWSER_LIST, CSS_DEST, CSS_PROD_BUNDLE, DEPENDENCIES, ENV, TMP_DIR } from '../../config';

const plugins = <any>gulpLoadPlugins();
let cleanCss = require('gulp-clean-css');

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

function prepareTemplates() {
  return gulp.src(join(APP_SRC, '**', '*.html'))
    .pipe(gulp.dest(TMP_DIR));
}

function processComponentCss() {
  return gulp.src([
      join(APP_SRC, '**', '*.css'),
      '!' + join(APP_SRC, 'assets', '**', '*.css')
    ])
    .pipe(isProd ? plugins.cached('process-component-css') : plugins.util.noop())
    .pipe(plugins.postcss(processors))
    .pipe(gulp.dest(isProd ? TMP_DIR: APP_DEST));
}

function processExternalCss() {
  return gulp.src(getExternalCss().map(r => r.src))
    .pipe(isProd ? plugins.cached('process-external-css') : plugins.util.noop())
    .pipe(plugins.postcss(processors))
    .pipe(isProd ? plugins.concatCss(CSS_PROD_BUNDLE) : plugins.util.noop())
    .pipe(isProd ? cleanCss() : plugins.util.noop())
    .pipe(gulp.dest(CSS_DEST));
}

function getExternalCss() {
  return DEPENDENCIES.filter(d => /\.css$/.test(d.src));
}

export = () => merge(processComponentCss(), prepareTemplates(), processExternalCss());
