import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';
import { makeTsProject, templateLocals } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, transpiling the TypeScript files for the production environment.
 */

export = () => {
  let tsProject = makeTsProject({
    allowJs: true,
    noFallthroughCasesInSwitch: false
  }, Config.TMP_DIR);
  let src = [
    join(Config.TMP_DIR, 'bundle.js')
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(tsProject())
    .once('error', function(e: any) {
      this.once('finish', () => process.exit(1));
    });

  return result.js
    .pipe(plugins.template(templateLocals()))
    .pipe(plugins.rename(Config.JS_PROD_APP_BUNDLE))
    .pipe(gulp.dest(Config.JS_DEST))
    .on('error', (e: any) => {
      console.log(e);
    });
};

