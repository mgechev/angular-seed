import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';
import { makeTsProject, templateLocals } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, transpiling the TypeScript files within the `tools` directory.
 */

const locals = templateLocals();

export = () => {

  let tsProject = makeTsProject();

  let src = [
    join(Config.PROJECT_ROOT, 'gulpfile.ts'),
    join(Config.TOOLS_DIR, 'manual_typings/**/*.d.ts'),
    join(Config.TOOLS_DIR, '**/*.ts')
  ];
  let result = gulp.src(src, { base: './' })
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(tsProject());

  return result.js
    .pipe(plugins.template(locals))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./'));
};
