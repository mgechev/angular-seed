import {join, sep, normalize} from 'path';
import {templateLocals} from '../utils';
import {
  APP_SRC,
  APP_DEST,
  CSS_DEST,
  JS_DEST,
  CSS_PROD_BUNDLE,
  JS_PROD_APP_BUNDLE,
  JS_PROD_SHIMS_BUNDLE
} from '../config';

export = function buildIndexProd(gulp, plugins) {
  return function () {
    return gulp.src(join(APP_SRC, 'index.html'))
      .pipe(injectJs())
      .pipe(injectCss())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST));
  };

  function inject(...files) {
    return plugins.inject(
      gulp.src(files, {
        read: false
      }), {
        transform: function (filepath) {
          let path = normalize(filepath).split(sep);
          arguments[0] = path.slice(path.length - 2, path.length).join(sep);
          return plugins.inject.transform.apply(plugins.inject.transform, arguments);
        }
      });
  }

  function injectJs() {
    return inject(join(JS_DEST, JS_PROD_SHIMS_BUNDLE),
      join(JS_DEST, JS_PROD_APP_BUNDLE));
  }

  function injectCss() {
    return inject(join(CSS_DEST, CSS_PROD_BUNDLE));
  }
};
