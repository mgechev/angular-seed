import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import * as slash from 'slash';

import { WEB_APP_BASE, WEB_APP_DEST, WEB_APP_SRC, DEPENDENCIES, WEB_CSS_DEST, WEB_ASSETS_SRC } from '../../../../config';
import { templateLocals } from '../../../../utils';

const plugins = <any>gulpLoadPlugins();


/**
 * Executes the build process, injecting the shims and libs into the `index.hml` for the development environment.
 */
export = () => {
  return gulp.src(join(WEB_APP_SRC, 'index.html'))
    .pipe(inject('shims'))
    .pipe(inject('libs'))
    .pipe(inject())
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(WEB_APP_DEST));
};

/**
 * Injects the file with the given name.
 * @param {string} name - The file to be injected.
 */
function inject(name?: string) {
  return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
    name,
    transform: transformPath()
  });
}

/**
 * Returns the injectable dependency, mapping its filename to its path.
 * @param {string} name - The dependency to be mapped.
 */
function getInjectablesDependenciesRef(name?: string) {
  return DEPENDENCIES
    .filter(dep => dep['inject'] && dep['inject'] === (name || true))
    .map(mapPath);
}

/**
 * Maps the path of the given dependency to its path according to the applications environment.
 * @param {any} dep - The dependency to be mapped.
 */
function mapPath(dep: any) {
  let envPath = dep.src;
  if (envPath.startsWith(WEB_APP_SRC) && !envPath.endsWith('.scss')) {
    envPath = join(WEB_APP_DEST, envPath.replace(WEB_APP_SRC, ''));
  } else if (envPath.startsWith(WEB_APP_SRC) && envPath.endsWith('.scss')) {
    envPath = envPath.replace(WEB_ASSETS_SRC, WEB_CSS_DEST).replace('.scss', '.css');
  }
  return envPath;
}

/**
 * Transform the path of a dependecy to its location within the `dist` directory according to the applications
 * environment.
 */
function transformPath() {
  return function (filepath: string) {
    arguments[0] = join(WEB_APP_BASE, filepath) + `?${Date.now()}`;
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}
