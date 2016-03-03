import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join} from 'path';
import {BOOTSTRAP_MODULE, APP_SRC, APP_DEST} from '../../config';
import {makeTsProject} from '../../utils';
const plugins = <any>gulpLoadPlugins();

export = () => {
  let tsProject = makeTsProject();
  let src = [
    'typings/browser.d.ts',
    'tools/manual_typings/**/*.d.ts',
    join(APP_SRC, '**/*.ts'),
    '!' + join(APP_SRC, '**/*.e2e.ts'),
    '!' + join(APP_SRC, `${BOOTSTRAP_MODULE}.ts`)
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(plugins.inlineNg2Template({ base: APP_SRC, useRelativePaths: true }))
    .pipe(plugins.typescript(tsProject));

  return result.js
    .pipe(gulp.dest(APP_DEST));
}
