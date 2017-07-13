import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';
import { makeTsProject, } from '../../utils';
import { TemplateLocalsBuilder } from '../../utils/seed/template_locals';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, transpiling the TypeScript files for the production environment.
 */

export = () => {
  const tsProject = makeTsProject({
    allowJs: true,
    noFallthroughCasesInSwitch: false
  }, Config.TMP_DIR);
  const src = [
    join(Config.TMP_DIR, 'bundle.js')
  ];
  const result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(Config.PRESERVE_SOURCE_MAPS ? plugins.sourcemaps.init({loadMaps: true, largeFile:true}) : plugins.util.noop())
    .pipe(tsProject())
    .once('error', function (e: any) {
      this.once('finish', () => process.exit(1));
    });

  return result.js
    .pipe(Config.PRESERVE_SOURCE_MAPS ? plugins.sourcemaps.write() : plugins.util.noop())
    .pipe(plugins.template(new TemplateLocalsBuilder().build()))
    .pipe(plugins.rename(Config.JS_PROD_APP_BUNDLE))
    .pipe(gulp.dest(Config.JS_DEST))
    .on('error', (e: any) => {
      console.log(e);
    });
};
