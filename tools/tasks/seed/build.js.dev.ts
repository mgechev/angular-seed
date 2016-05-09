import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import { join } from 'path';
import { APP_SRC, APP_DEST, TOOLS_DIR } from '../../config';
import { templateLocals, makeTsProject } from '../../utils';
const plugins = <any>gulpLoadPlugins();

export = () => {
  let tsProject = makeTsProject();
  let typings = gulp.src([
    'typings/browser.d.ts',
    TOOLS_DIR + '/manual_typings/**/*.d.ts'
  ]);
  let src = [
    join(APP_SRC, '**/*.ts'),
    '!' + join(APP_SRC, '**/*.spec.ts'),
    '!' + join(APP_SRC, '**/*.e2e.ts')
  ];

  let projectFiles = gulp.src(src).pipe(plugins.cached());
  let result = merge(typings, projectFiles)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.typescript(tsProject));


  return result.js
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(APP_DEST));
};
