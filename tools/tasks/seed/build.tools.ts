import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';
import { makeTsProject } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, transpiling the TypeScript files within the `tools` directory.
 */
export = () => {
  const tsProject = makeTsProject();

  const src = [
    join(Config.PROJECT_ROOT, 'gulpfile.ts'),
    join(Config.TOOLS_DIR, 'manual_typings/**/*.d.ts'),
    join(Config.TOOLS_DIR, '**/*.ts')
  ];
  const result = gulp
    .src(src, { base: './' })
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(tsProject());

  return result.js.pipe(plugins.sourcemaps.write()).pipe(gulp.dest('./'));
};
