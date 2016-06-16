import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join, sep, normalize } from 'path';
import * as slash from 'slash';

import {
  WEB_APP_BASE,
  WEB_APP_DEST,
  WEB_APP_SRC,
  WEB_CSS_DEST,
  WEB_CSS_PROD_BUNDLE,
  WEB_JS_DEST,
  WEB_JS_PROD_APP_BUNDLE,
  WEB_JS_PROD_SHIMS_BUNDLE
} from '../../../../config';
import { templateLocals } from '../../../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, injecting the JavaScript and CSS dependencies into the `index.html` for the production
 * environment.
 */
export = () => {
  return gulp.src(join(WEB_APP_SRC, 'index.html'))
    .pipe(injectJs())
    .pipe(injectCss())
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(WEB_APP_DEST));
};

/**
 * Injects the given file array and transforms the path of the files.
 * @param {Array<string>} files - The files to be injected.
 */
function inject(...files: Array<string>) {
    return plugins.inject(gulp.src(files, { read: false }), {
        files,
        transform: transformPath()
    });
}

/**
 * Injects the bundled JavaScript shims and application bundles for the production environment.
 */
function injectJs() {
  return inject(join(WEB_JS_DEST, WEB_JS_PROD_SHIMS_BUNDLE), join(WEB_JS_DEST, WEB_JS_PROD_APP_BUNDLE));
}

/**
 * Injects the bundled CSS files for the production environment.
 */
function injectCss() {
  return inject(join(WEB_CSS_DEST, WEB_CSS_PROD_BUNDLE));
}

/**
 * Transform the path of a dependecy to its location within the `dist` directory according to the applications
 * environment.
 */
function transformPath() {
  return function(filepath: string) {
    let path: Array<string> = normalize(filepath).split(sep);
    arguments[0] = WEB_APP_BASE + path.slice(3, path.length).join(sep) + `?${Date.now()}`;
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}
