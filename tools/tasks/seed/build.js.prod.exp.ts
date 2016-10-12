import { readdirSync, lstatSync } from 'fs';
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
  let tsProject = makeTsProject({}, Config.TMP_DIR);
  let toIgnore = readdirSync(Config.TMP_DIR).filter((f: string) =>
    lstatSync(join(Config.TMP_DIR, f)).isDirectory() && f !== Config.BOOTSTRAP_DIR)
    .map((f: string) => '!' + join(Config.TMP_DIR, f, Config.NG_FACTORY_FILE + '.ts'));

  let src = [
    Config.TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(Config.TMP_DIR, '**/*.ts'),
    join(Config.TMP_DIR, `${Config.BOOTSTRAP_FACTORY_PROD_MODULE}.ts`),
    ...toIgnore
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(tsProject())
    .once('error', function(e: any) {
      this.once('finish', () => process.exit(1));
    });

  return result.js
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(Config.TMP_DIR))
    .on('error', (e: any) => {
      console.log(e);
    });
};
