import {join} from 'path';
import {APP_SRC, APP_DEST, APP_BASE, DEV_DEPENDENCIES} from '../config';
import {templateLocals} from '../utils';
import * as slash from 'slash';

export = function buildIndexDev(gulp, plugins) {
  return function () {
    return gulp.src(join(APP_SRC, 'index.html'))
      .pipe(inject('shims'))
      .pipe(inject('libs'))
      .pipe(inject())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST));
  };


  function inject(name?: string) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
      name,
      transform: transformPath()
    });
  }

  function getInjectablesDependenciesRef(name?: string) {
    return DEV_DEPENDENCIES
      .filter(dep => dep['inject'] && dep['inject'] === (name || true))
      .map(mapPath);
  }

  function mapPath(dep) {
    let envPath = dep.src;
    if (envPath.startsWith(APP_SRC)) {
      envPath = join(APP_DEST, dep.src.replace(APP_SRC, ''));
    }
    return envPath;
  }

  function transformPath() {
    return function (filepath) {
      arguments[0] = join(APP_BASE, filepath) + `?${Date.now()}`;
      return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
    };
  }

};
