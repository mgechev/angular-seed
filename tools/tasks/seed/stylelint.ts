import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, linting the style files using `stylelint`.
 */
export = () => {
  const src = [
    join(Config.APP_SRC, '**/*.css'),
    join(Config.APP_SRC, '**/*.sass'),
    join(Config.APP_SRC, '**/*.scss'),
  ];

  return gulp.src(src, { 'base': '.' })
    .pipe(plugins.stylelint({
      failAfterError: require('is-ci') || Config.FORCE_STYLELINT_EMIT_ERROR,
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
};
