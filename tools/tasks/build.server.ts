import {join} from "path";
import {SERVER_SRC, SERVER_DEST} from "../config";
import {tsProjectFn} from "../utils";

export = function buildJSDev(gulp, plugins) {
  let tsProject = tsProjectFn(plugins);
  return function () {
    let src = [ "typings/main.d.ts",
                join(SERVER_SRC, "**/*.ts"),
                "!" + join(SERVER_SRC, "**/*_spec.ts")
              ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      // won"t be required for non-production build after the change
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(SERVER_DEST));
  };
};
