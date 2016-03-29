import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join, sep, normalize} from 'path';
import * as slash from 'slash';
import {templateLocals} from '../../utils';
import {
  APP_BASE,
  APP_SRC,
  APP_DEST,
  CSS_DEST,
  JS_DEST,
  CSS_PROD_BUNDLE,
  JS_PROD_APP_BUNDLE,
  JS_PROD_SHIMS_BUNDLE
} from '../../config';
const plugins = <any>gulpLoadPlugins();

export = () => {
  return gulp.src(join(APP_SRC, 'index.html'))
    .pipe(injectJs())
    .pipe(injectCss())
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(APP_DEST));
}

function inject(...files: Array<string>) {
    return plugins.inject(gulp.src(files, { read: false }), {
        files,
        transform: transformPath()
    });
}

function injectJs() {
  return inject(join(JS_DEST, JS_PROD_SHIMS_BUNDLE), join(JS_DEST, JS_PROD_APP_BUNDLE));
}

function injectCss() {
  return inject(join(CSS_DEST, CSS_PROD_BUNDLE));
}

function transformPath() {
  return function(filepath: string) {
    let path: Array<string> = normalize(filepath).split(sep);
    arguments[0] = APP_BASE + path.slice(3, path.length).join(sep) + `?${Date.now()}`;
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}
