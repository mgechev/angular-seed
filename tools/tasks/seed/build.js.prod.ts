import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import * as merge from 'merge-stream';

import { TMP_DIR, TOOLS_DIR, LAZY_TEMPLATE, BOOTSTRAP_DIR, PROD_DEST } from '../../config';
import { makeTsProject, templateLocals } from '../../utils';

const plugins = <any>gulpLoadPlugins();

const INLINE_OPTIONS = {
  base: TMP_DIR,
  useRelativePaths: false,
  removeLineBreaks: true
};

/**
 * Executes the build process, transpiling the TypeScript files for the
 * production environment.
 */
function buildTS() {
  let tsProject = makeTsProject();
  let src = [
    'typings/browser.d.ts',
    TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(TMP_DIR, '**/*.ts')
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(LAZY_TEMPLATE ? plugins.util.noop() : plugins.inlineNg2Template(INLINE_OPTIONS))
    .pipe(plugins.typescript(tsProject));

  return result.js
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(TMP_DIR));
}

/**
 * Copy template files for the production environment if in LAZY TEMPLATE mode.
 */
function copyTemplates() {

  let result = gulp.src([join(TMP_DIR, BOOTSTRAP_DIR, '**', '*.html')]);

  if (LAZY_TEMPLATE) {
    return result.pipe(gulp.dest(join(PROD_DEST, BOOTSTRAP_DIR)));
  }

  return result;
}

export = () => merge(buildTS(), copyTemplates());
