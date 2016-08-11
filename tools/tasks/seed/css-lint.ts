import * as colorguard from 'colorguard';
import * as doiuse from 'doiuse';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as reporter from 'postcss-reporter';
import * as stylelint from 'stylelint';
import { join } from 'path';

import { APP_ASSETS, APP_SRC, BROWSER_LIST, CSS_SRC, ENV, DEPENDENCIES, ENABLE_SCSS,  COLOR_GUARD_WHITE_LIST} from '../../config';

const plugins = <any>gulpLoadPlugins();

const isProd = ENV === 'prod';
var stylesheetType = ENABLE_SCSS ? 'scss' : 'css';

const processors = [
  doiuse({
    browsers: BROWSER_LIST,
  }),
  colorguard({
    whitelist: COLOR_GUARD_WHITE_LIST
  }),
  stylelint(),
  reporter({clearMessages: true})
];

function lintComponentStylesheets() {
  return gulp.src([
    join(APP_SRC, '**', `*.${stylesheetType}`),
    `!${join(APP_SRC, 'assets', '**', '*.scss')}`,
    `!${join(CSS_SRC, '**', '*.css')}`
  ]).pipe(isProd ? plugins.cached('css-lint') : plugins.util.noop())
    .pipe(ENABLE_SCSS ? plugins.sassLint() : plugins.postcss(processors))
    .pipe(ENABLE_SCSS ? plugins.sassLint.format() : plugins.util.noop())
    .pipe(ENABLE_SCSS ? plugins.sassLint.failOnError() : plugins.util.noop());
}

function lintExternalStylesheets() {
  return gulp.src(getExternalStylesheets().map(r => r.src))
    .pipe(isProd ? plugins.cached('css-lint') : plugins.util.noop())
    .pipe(ENABLE_SCSS ? plugins.sassLint() : plugins.postcss(processors))
    .pipe(ENABLE_SCSS ? plugins.sassLint.format() : plugins.util.noop())
    .pipe(ENABLE_SCSS ? plugins.sassLint.failOnError() : plugins.util.noop());
}

function getExternalStylesheets() {
  let stylesheets = ENABLE_SCSS ? DEPENDENCIES : APP_ASSETS;
  return stylesheets
    .filter(d => new RegExp(`\.${stylesheetType}$`)
    .test(d.src) && !d.vendor);
}

/**
 * Executes the build process, linting the component and external CSS files using `stylelint`.
 */
export = () => merge(lintComponentStylesheets(), lintExternalStylesheets());
