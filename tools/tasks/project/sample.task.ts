import {join} from 'path';
import {APP_SRC, APP_DEST} from '../../config';

import {config} from '../../config';
import {provide} from 'angular2/core';
let conf = config.resolveAndCreateChild([
  provide(APP_SRC, { useValue: 'my-test' })
]);

console.log(conf.get(APP_SRC));

/**
 * Sample tasks
 *
 */

export = function sampleTask(gulp, plugins) {
  return function () {
    return gulp.src(join(APP_SRC, '**/*.ts'))
      .pipe(gulp.dest(APP_DEST));
  };
}
