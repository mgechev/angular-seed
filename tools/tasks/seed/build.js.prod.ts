import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import { APP_SRC, TMP_DIR, TOOLS_DIR } from '../../config';
import { makeTsProject, templateLocals } from '../../utils';

const plugins = <any>gulpLoadPlugins();

const INLINE_OPTIONS = {
  base: TMP_DIR,
  useRelativePaths: false,
  removeLineBreaks: true
};

export = () => {
  let tsProject = makeTsProject();
  let src = [
    'typings/browser.d.ts',
    TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(APP_SRC, '**/*.ts')
    // To use later
    // join(APP_SRC, '**/*.ngfactory.ts'),
    // join(APP_SRC, '**/*.css.shim.ts'),
    // join(APP_SRC, 'app/main.ts')
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    // .pipe(plugins.inlineNg2Template(INLINE_OPTIONS))
    .pipe(plugins.typescript(tsProject));

  return result.js
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(TMP_DIR));
};
