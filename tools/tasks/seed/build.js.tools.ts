import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import { TOOLS_DIR } from '../../config';
import { makeTsProject, templateLocals,  } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, transpiling the TypeScript files within the `tools` directory.
 */
export = () => {
  let tsProject = makeTsProject();
  let src = [
    'typings/index.d.ts',
    TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(TOOLS_DIR, '**/*.ts')
  ];
  let result = gulp.src(src, { base: './' })
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.typescript(tsProject));

  return result.js
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest('./'));
};
