import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join} from 'path';
import {APP_SRC, TOOLS_DIR, CODELYZER_RULES} from '../../config';
const plugins = <any>gulpLoadPlugins();

export = () => {
  let src = [
    join(APP_SRC, '**/*.ts'),
    '!' + join(APP_SRC, '**/*.d.ts'),
    join(TOOLS_DIR, '**/*.ts'),
    '!' + join(TOOLS_DIR, '**/*.d.ts')
  ];

  return gulp.src(src)
    .pipe(plugins.tslint({
      rulesDirectory: CODELYZER_RULES
    }))
    .pipe(plugins.tslint.report(require('tslint-stylish'), {
      emitError: require('is-ci'),
      sort: true,
      bell: true
    }));
};
