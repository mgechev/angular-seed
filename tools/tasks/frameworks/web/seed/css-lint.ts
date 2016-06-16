import * as colorguard from 'colorguard';
import * as doiuse from 'doiuse';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as reporter from 'postcss-reporter';
import * as stylelint from 'stylelint';
import { join } from 'path';

import { WEB_APP_ASSETS, WEB_APP_SRC, WEB_BROWSER_LIST, WEB_CSS_SRC, ENV, DEPENDENCIES, WEB_ENABLE_SCSS } from '../../../../config';

const plugins = <any>gulpLoadPlugins();

const isProd = ENV === 'prod';
var stylesheetType = WEB_ENABLE_SCSS ? 'scss' : 'css';

const processors = [
  doiuse({
    browsers: WEB_BROWSER_LIST,
  }),
  colorguard(),
  stylelint(),
  reporter({clearMessages: true})
];

function lintComponentStylesheets() {
  return gulp.src([
    join(WEB_APP_SRC, '**', `*.${stylesheetType}`),
    `!${join(WEB_APP_SRC, 'assets', '**', '*.scss')}`,
    `!${join(WEB_CSS_SRC, '**', '*.css')}`
  ]).pipe(isProd ? plugins.cached('css-lint') : plugins.util.noop())
    .pipe(WEB_ENABLE_SCSS ? plugins.sassLint() : plugins.postcss(processors))
    .pipe(WEB_ENABLE_SCSS ? plugins.sassLint.format() : plugins.util.noop())
    .pipe(WEB_ENABLE_SCSS ? plugins.sassLint.failOnError() : plugins.util.noop());
}

function lintExternalStylesheets() {
  return gulp.src(getExternalStylesheets().map((r: any) => r.src))
    .pipe(isProd ? plugins.cached('css-lint') : plugins.util.noop())
    .pipe(WEB_ENABLE_SCSS ? plugins.sassLint() : plugins.postcss(processors))
    .pipe(WEB_ENABLE_SCSS ? plugins.sassLint.format() : plugins.util.noop())
    .pipe(WEB_ENABLE_SCSS ? plugins.sassLint.failOnError() : plugins.util.noop());
}

function getExternalStylesheets() {
  let stylesheets = WEB_ENABLE_SCSS ? DEPENDENCIES : WEB_APP_ASSETS;
  return stylesheets
    .filter(d => new RegExp(`\.${stylesheetType}$`)
    .test(d.src) && !d.vendor);
}

/**
 * Executes the build process, linting the component and external CSS files using `stylelint`.
 */
export = () => merge(lintComponentStylesheets(), lintExternalStylesheets());
