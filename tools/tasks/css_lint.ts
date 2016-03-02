import * as merge from 'merge-stream';
import * as reporter from 'postcss-reporter';
import * as stylelint from 'stylelint';
import * as doiuse from 'doiuse';
import * as colorguard from 'colorguard';
import {join} from 'path';
import {
  APP_SRC,
  APP_ASSETS,
  BROWSER_LIST,
  ENV
} from '../config';

const isProd = ENV === 'prod';

const processors = [
  doiuse({
    browsers: BROWSER_LIST,
  }),
  colorguard(),
  stylelint(),
  reporter({clearMessages: true})
];

export = function cssLint(gulp, plugins) {
  return function () {

    return merge(lintComponentCss(), lintExternalCss());

    function lintComponentCss() {
      return gulp.src([
          join(APP_SRC, '**', '*.css'),
          '!' + join(APP_SRC, 'assets', '**', '*.css')
        ])
        .pipe(isProd ? plugins.cached('css-lint') : plugins.util.noop())
        .pipe(plugins.postcss(processors));
    }

    function lintExternalCss() {
      return gulp.src(getExternalCss().map(r => r.src))
        .pipe(isProd ? plugins.cached('css-lint') : plugins.util.noop())
        .pipe(plugins.postcss(processors));
    }

    function getExternalCss() {
      return APP_ASSETS.filter(d => /\.css$/.test(d.src) && !d.vendor);
    }
  };
};
