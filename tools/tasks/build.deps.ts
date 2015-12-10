import * as merge from 'merge-stream';
import {DEPENDENCIES} from '../config';

export = function buildDepsProd(gulp, plugins) {
  return function () {
    let stream = merge();

    DEPENDENCIES.forEach(dep => {
      stream.add(addStream(dep));
    });

    return stream;

    function addStream(dep) {
      let stream = gulp.src(dep.src);
      stream.pipe(gulp.dest(dep.dest));
      return stream;
    }
  };
};
