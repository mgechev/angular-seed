import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as util from 'gulp-util';
import { join } from 'path';

import Config from '../../config';
import { makeTsProject } from '../../utils';
import { TypeScriptTask } from '../typescript_task';

const plugins = <any>gulpLoadPlugins();

let typedBuildCounter = Config.TYPED_COMPILE_INTERVAL; // Always start with the typed build.

/**
 * Executes the build process, transpiling the TypeScript files (excluding the spec and e2e-spec files) for the test
 * environment.
 */
export =
  class BuildJsTest extends TypeScriptTask {
    run() {
      let tsProject: any;
      let typings = gulp.src( [
        Config.TOOLS_DIR + '/manual_typings/**/*.d.ts'
      ] );
      let src = [
        join(Config.APP_SRC, '**/*.spec.ts')
      ];

      let projectFiles = gulp.src(src);
      let result: any;
      let isFullCompile = true;

      // Only do a typed build every X builds, otherwise do a typeless build to speed things up
      if (typedBuildCounter < Config.TYPED_COMPILE_INTERVAL) {
        isFullCompile = false;
        tsProject = makeTsProject({isolatedModules: true});
        projectFiles = projectFiles.pipe(plugins.cached());
        util.log('Performing typeless TypeScript compile of specs.');
      } else {
        tsProject = makeTsProject();
        projectFiles = merge(typings, projectFiles);
      }

      //noinspection TypeScriptUnresolvedFunction
      result = projectFiles
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(tsProject())
        .on('error', () => {
          typedBuildCounter = Config.TYPED_COMPILE_INTERVAL;
        });

      if (isFullCompile) {
        typedBuildCounter = 0;
      } else {
        typedBuildCounter++;
      }

      return result.js
        .pipe(plugins.sourcemaps.write())
        // Use for debugging with Webstorm/IntelliJ
        // https://github.com/mgechev/angular-seed/issues/1220
        //    .pipe(plugins.sourcemaps.write('.', {
        //      includeContent: false,
        //      sourceRoot: (file: any) =>
        //        relative(file.path, PROJECT_ROOT + '/' + APP_SRC).replace(sep, '/') + '/' + APP_SRC
        //    }))
        .pipe(gulp.dest(Config.APP_DEST));
    }
};
