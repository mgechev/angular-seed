import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import { WEB_APP_DEST, WEB_APP_SRC, TOOLS_DIR } from '../../../../config';
import { makeTsProject, templateLocals } from '../../../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, transpiling the TypeScript files (including the e2e-spec files, excluding the spec files)
 * for the e2e environment.
 */
export = () => {
  let tsProject = makeTsProject();
  let src = [
    'typings/index.d.ts',
    TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(WEB_APP_SRC, '**/*.ts'),
    '!' + join(WEB_APP_SRC, '**/*.spec.ts')
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.typescript(tsProject));

  return result.js
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(WEB_APP_DEST));
};
