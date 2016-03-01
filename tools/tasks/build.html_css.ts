import * as merge from 'merge-stream';
import * as autoprefixer from 'autoprefixer';
import * as assets from 'postcss-assets';
import * as cssnano from 'cssnano';
import {join} from 'path';
import {
  APP_SRC,
  TMP_DIR,
  PROD_DEPENDENCIES,
  CSS_PROD_BUNDLE,
  CSS_DEST,
  APP_DEST,
  BROWSER_LIST,
  ENV
} from '../config';

const processors = [
  autoprefixer({
    browsers: BROWSER_LIST
  }),
  assets({
    basePath: APP_DEST,
    loadPaths: [join('assets', '**', '*')]
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

export = function buildHTMLCSS(gulp, plugins) {
  return function () {

    return merge(processComponentCss(), prepareTemplates(), processExternalCss());

    function prepareTemplates() {
      return gulp.src(join(APP_SRC, '**', '*.html'))
        .pipe(gulp.dest(TMP_DIR));
    }

    function processComponentCss() {
      return gulp.src([
          join(APP_SRC, '**', '*.css'),
          '!' + join(APP_SRC, 'assets', '**', '*.css')
        ])
        .pipe(plugins.postcss(processors))
        .pipe(gulp.dest(isProd ? TMP_DIR: APP_DEST));
    }

    function processExternalCss() {
      return gulp.src(getExternalCss().map(r => r.src))
        .pipe(plugins.postcss(processors))
        .pipe(isProd ? plugins.concat(CSS_PROD_BUNDLE) : plugins.util.noop())
        .pipe(gulp.dest(CSS_DEST));
    }

    function getExternalCss() {
      return PROD_DEPENDENCIES.filter(d => /\.css$/.test(d.src));
    }
  };
};
