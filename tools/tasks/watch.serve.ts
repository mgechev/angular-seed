import * as runSequence from "run-sequence";
import {join} from "path";
import {APP_SRC, SERVER_SRC} from "../config";
import {notifyLiveReload} from "../utils";

export = function watchServe(gulp, plugins) {
  return function () {
    plugins.watch([
        join(APP_SRC, "**"),
        join(SERVER_SRC, "**")
        ], e =>
      runSequence("build.dev", () => notifyLiveReload(e))
    );
  };
};
