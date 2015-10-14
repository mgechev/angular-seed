import {join} from 'path';
import {injectableDevAssetsRef, transformPath, templateLocals} from '../utils';
import {PATH} from '../workflow.config';

export = function buildIndexDev(gulp, plugins) {
  return function () {
    let target = gulp.src(injectableDevAssetsRef(), { read: false });

    return gulp.src(join(PATH.src.all, 'index.html'))
      .pipe(plugins.inject(target, {
        transform: transformPath(plugins, 'dev')
      }))
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(PATH.dest.dev.all));
  };
}
