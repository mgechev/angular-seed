import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';
import { makeTsProject, TemplateLocalsBuilder } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, transpiling the TypeScript files (including the e2e-spec files, excluding the spec files)
 * for the e2e environment.
 */
export = () => {
  let tsProject = makeTsProject({ 'target': 'es2015' }, Config.E2E_SRC);
  let src = [
    Config.TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(Config.E2E_SRC, '**/*.ts')
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(tsProject());

  return result.js
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.template(new TemplateLocalsBuilder().withStringifiedSystemConfigDev().build()))
    .pipe(gulp.dest(Config.E2E_DEST));
};
