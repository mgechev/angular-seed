import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join, sep, normalize } from 'path';
import * as slash from 'slash';

import {
  APP_BASE,
  APP_DEST,
  APP_SRC,
  CSS_DEST,
  CSS_PROD_BUNDLE,
  JS_DEST,
  JS_PROD_APP_BUNDLE,
  JS_PROD_SHIMS_BUNDLE,
  JS_PROD_DEPENDENCIES_BUNDLE
} from '../../config';
import { templateLocals } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, injecting the JavaScript and CSS dependencies into the `index.html` for the production
 * environment.
 */
export = () => {
  return gulp.src(join(APP_SRC, 'index.html'))
    .pipe(injectJsShim())
    .pipe(injectJsLibs())
    .pipe(injectJsApp())
    .pipe(injectCss())
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(APP_DEST));
};

/**
 * Injects the given file array into the corresponding inject location and transforms the path of the files.
 * @param {string} name - The name of the inject location.
 * @param {Array<string>} files - The files to be injected.
 */
function inject(name: string, ...files: Array<string>) {
    return plugins.inject(gulp.src(files, { read: false }), {
        name,
        transform: transformPath()
    });
}

/**
 * Injects the bundled JavaScript shims and application bundles for the production environment.
 */
function injectJsShim() {
  return inject('shims', join(JS_DEST, JS_PROD_SHIMS_BUNDLE));
}

function injectJsLibs() {
  return inject('libs', join(JS_DEST, JS_PROD_DEPENDENCIES_BUNDLE));
}

function injectJsApp() {
  return inject(null, join(JS_DEST, JS_PROD_APP_BUNDLE));
}

/**
 * Injects the bundled CSS files for the production environment.
 */
function injectCss() {
  return inject(join(CSS_DEST, CSS_PROD_BUNDLE));
}

/**
 * Transform the path of a dependecy to its location within the `dist` directory according to the applications
 * environment.
 */
function transformPath() {
  return function(filepath: string) {
    let path: Array<string> = normalize(filepath).split(sep);
    arguments[0] = APP_BASE + path.slice(3, path.length).join(sep) + `?${Date.now()}`;
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}
