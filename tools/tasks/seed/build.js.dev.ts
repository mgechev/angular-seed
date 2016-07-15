import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as util from 'gulp-util';
import { join } from 'path';

import { APP_DEST, APP_SRC, TOOLS_DIR, TYPED_COMPILE_INTERVAL } from '../../config';
import { makeTsProject, templateLocals } from '../../utils';

const plugins = <any>gulpLoadPlugins();

let typedBuildCounter = TYPED_COMPILE_INTERVAL; // Always start with the typed build.

/**
 * Executes the build process, transpiling the TypeScript files (except the spec and e2e-spec files) for the development
 * environment.
 */
export = () => {
  let tsProject: any;
  let typings = gulp.src([
    'typings/index.d.ts',
    TOOLS_DIR + '/manual_typings/**/*.d.ts'
  ]);
  let src = [
    join(APP_SRC, '**/*.ts'),
    '!' + join(APP_SRC, '**/*.spec.ts'),
    '!' + join(APP_SRC, '**/*.e2e-spec.ts')
  ];

  let projectFiles = gulp.src(src);
  let result: any;
  let isFullCompile = true;

  // Only do a typed build every X builds, otherwise do a typeless build to speed things up
  if (typedBuildCounter < TYPED_COMPILE_INTERVAL) {
    isFullCompile = false;
    tsProject = makeTsProject({isolatedModules: true});
    projectFiles = projectFiles.pipe(plugins.cached());
    util.log('Performing typeless TypeScript compile.');
  } else {
    tsProject = makeTsProject();
    projectFiles = merge(typings, projectFiles);
  }

  result = projectFiles
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.typescript(tsProject))
    .on('error', () => {
      typedBuildCounter = TYPED_COMPILE_INTERVAL;
    });

  if (isFullCompile) {
    typedBuildCounter = 0;
  } else {
    typedBuildCounter++;
  }

  return result.js
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(APP_DEST));
};
