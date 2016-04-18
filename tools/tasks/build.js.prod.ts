import {join} from "path";
import {APP_SRC, /* TEST_SRC, */ TMP_DIR, TOOLS_DIR} from "../config";
import {tsProjectFn, templateLocals} from "../utils";

export = function buildJSProd(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
      "typings/browser.d.ts",
      TOOLS_DIR + "/manual_typings/**/*.d.ts",
      join(APP_SRC, "**/*.ts"),
      "!" + join(APP_SRC, "**/*.spec.ts"),
      "!" + join(APP_SRC, "**/*.e2e.ts")
    ];

    const INLINE_OPTIONS = {
      base: TMP_DIR,
      useRelativePaths: false,
      removeLineBreaks: true
    };

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      // .pipe(plugins.inlineNg2Template()) // base is incorrect,
      .pipe(plugins.inlineNg2Template(INLINE_OPTIONS)) // base is incorrect,
      .pipe(plugins.typescript(tsProject));
    return result.js
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(TMP_DIR));
  };
};
