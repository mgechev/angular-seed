import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';
import { makeTsProject } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, transpiling the TypeScript files for the production environment.
 */

export = () => {
  const tsProject = makeTsProject({
    target: 'es2015',
    module: 'es2015',
    moduleResolution: 'node',
    types: [
      'express',
      'jasmine',
      'node',
      'protractor',
      'systemjs'
    ]
  }, Config.TMP_DIR);
  const src = [
    join(Config.TOOLS_DIR, '/manual_typings/**/*.d.ts'),
    join(Config.TMP_DIR, '**/*.ts')
  ];
  const result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(tsProject())
    .once('error', () => {
      this.once('finish', () => process.exit(1));
    });

  return result.js
    .pipe(gulp.dest(Config.TMP_DIR))
    .on('error', (e: any) => {
      console.log(e);
    });
};
