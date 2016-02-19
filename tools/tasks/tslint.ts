import {join} from 'path';
import {APP_SRC, TOOLS_DIR, NG2LINT_RULES} from '../config';

export = function tslint(gulp, plugins) {
  return function () {
    let src = [
      join(APP_SRC, '**/*.ts'),
      '!' + join(APP_SRC, '**/*.d.ts'),
      join(TOOLS_DIR, '**/*.ts'),
      '!' + join(TOOLS_DIR, '**/*.d.ts')
    ];

    return gulp.src(src)
      .pipe(plugins.tslint({
        rulesDirectory: NG2LINT_RULES
      }))
      .pipe(plugins.tslint.report(plugins.tslintStylish, {
        emitError: true,
        sort: true,
        bell: true
      }));
  };
};
