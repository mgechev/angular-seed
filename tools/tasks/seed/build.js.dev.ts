import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as util from 'gulp-util';
import { join/*, sep, relative*/ } from 'path';

import {
  APP_DEST,
  SYSTEM_CONFIG_DEV,
  APP_SRC,
  BOOTSTRAP_FACTORY_PROD_MODULE,
  /*PROJECT_ROOT, */TOOLS_DIR,
  TYPED_COMPILE_INTERVAL
} from '../../config';
import { makeTsProject, templateLocals } from '../../utils';

const plugins = <any>gulpLoadPlugins();

const jsonSystemConfig = JSON.stringify(SYSTEM_CONFIG_DEV);

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
    '!' + join(APP_SRC, '**/*.e2e-spec.ts'),
    '!' + join(APP_SRC, `**/${BOOTSTRAP_FACTORY_PROD_MODULE}.ts`)
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
// Use for debugging with Webstorm/IntelliJ
// https://github.com/mgechev/angular2-seed/issues/1220
//    .pipe(plugins.sourcemaps.write('.', {
//      includeContent: false,
//      sourceRoot: (file: any) =>
//        relative(file.path, PROJECT_ROOT + '/' + APP_SRC).replace(sep, '/') + '/' + APP_SRC
//    }))
    .pipe(plugins.template(Object.assign(
      templateLocals(), {
        SYSTEM_CONFIG_DEV: jsonSystemConfig
      }
     )))
    .pipe(gulp.dest(APP_DEST));
};
