import {join} from "path";
import {APP_SRC, TOOLS_DIR, SERVER_SRC} from "../config";


export = function tslint(gulp, plugins) {
  return function () {
    let src = [
      join(APP_SRC, "**/*.ts"),
      "!" + join(APP_SRC, "**/*.d.ts"),
      join(TOOLS_DIR, "**/*.ts"),
      "!" + join(TOOLS_DIR, "**/*.d.ts"),
      join(SERVER_SRC, "**/*.ts"),
      "!" + join(SERVER_SRC, "**/*.d.ts")
    ];

    return gulp.src(src)
      .pipe(plugins.tslint())
      .pipe(plugins.tslint.report(plugins.tslintStylish, {
        bell: true,
        emitError: true,
        sort: true
      }));
  };
};
