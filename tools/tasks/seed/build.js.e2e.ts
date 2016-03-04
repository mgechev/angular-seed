import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join} from 'path';
import {APP_SRC, APP_DEST} from '../../config';
import {templateLocals, makeTsProject} from '../../utils';
const plugins = <any>gulpLoadPlugins();


export = () => {
  let tsProject = makeTsProject();
  let src = [
    'typings/browser.d.ts',
    'tools/manual_typings/**/*.d.ts',
    join(APP_SRC, '**/*.ts'),
    '!' + join(APP_SRC, '**/*.spec.ts')
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.typescript(tsProject));

  return result.js
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(APP_DEST));
}
