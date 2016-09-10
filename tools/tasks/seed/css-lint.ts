import * as colorguard from 'colorguard';
import * as doiuse from 'doiuse';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as reporter from 'postcss-reporter';
import * as stylelint from 'stylelint';
import { join } from 'path';

import Config from '../../config';

const plugins = <any>gulpLoadPlugins();

const isProd = Config.ENV === 'prod';
var stylesheetType = Config.ENABLE_SCSS ? 'scss' : 'css';

const processors = [
  doiuse({
    browsers: Config.BROWSER_LIST,
  }),
  colorguard({
    whitelist: Config.COLOR_GUARD_WHITE_LIST
  }),
  stylelint(),
  reporter({clearMessages: true})
];

function lintComponentStylesheets() {
  return gulp.src([
    join(Config.APP_SRC, '**', `*.${stylesheetType}`),
    `!${join(Config.APP_SRC, 'assets', '**', '*.scss')}`,
    `!${join(Config.CSS_SRC, '**', '*.css')}`
  ]).pipe(isProd ? plugins.cached('css-lint') : plugins.util.noop())
    .pipe(Config.ENABLE_SCSS ? plugins.sassLint() : plugins.postcss(processors))
    .pipe(Config.ENABLE_SCSS ? plugins.sassLint.format() : plugins.util.noop())
    .pipe(Config.ENABLE_SCSS ? plugins.sassLint.failOnError() : plugins.util.noop());
}

function lintExternalStylesheets() {
  return gulp.src(getExternalStylesheets().map(r => r.src))
    .pipe(isProd ? plugins.cached('css-lint') : plugins.util.noop())
    .pipe(Config.ENABLE_SCSS ? plugins.sassLint() : plugins.postcss(processors))
    .pipe(Config.ENABLE_SCSS ? plugins.sassLint.format() : plugins.util.noop())
    .pipe(Config.ENABLE_SCSS ? plugins.sassLint.failOnError() : plugins.util.noop());
}

function getExternalStylesheets() {
  let stylesheets = Config.ENABLE_SCSS ? Config.DEPENDENCIES : Config.APP_ASSETS;
  return stylesheets
    .filter(d => new RegExp(`\.${stylesheetType}$`)
    .test(d.src) && !d.vendor);
}

/**
 * Executes the build process, linting the component and external CSS files using `stylelint`.
 */
export = () => merge(lintComponentStylesheets(), lintExternalStylesheets());
