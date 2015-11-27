import {join} from 'path';
import {APP_SRC, APP_DEST, DEV_DEPENDENCIES} from '../config';
import {transformPath, templateLocals} from '../utils';

export = function buildIndexDev(gulp, plugins) {
  return function () {
    return gulp.src(join(APP_SRC, 'index.html'))
      // NOTE: There might be a way to pipe in loop.
      .pipe(inject('shims'))
      .pipe(inject())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST));
  };


  function inject(name?: string) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
      name,
      transform: transformPath(plugins, 'dev')
    });
  }

  function getInjectablesDependenciesRef(name?: string) {
    return DEV_DEPENDENCIES
      .filter(dep => dep['inject'] && dep['inject'] === (name || true))
      .map(dep => require.resolve(dep.src));
  }
};
