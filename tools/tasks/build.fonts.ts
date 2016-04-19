import {join} from "path";
import {FONTS_SRC1, FONTS_SRC2, FONTS_DEST} from "../config";

export = function buildAssetsDev(gulp, plugins) {
  return function () {
    return gulp.src([
        join(FONTS_SRC1, "**"),
        join(FONTS_SRC2, "**")
      ])
      .pipe(gulp.dest(FONTS_DEST));
  };
}
