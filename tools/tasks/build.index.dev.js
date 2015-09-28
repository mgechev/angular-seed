"use strict";

var path = require('path');
var join = path.join;
var PATH = require('../workflow.config').PATH;
var utils = require('../utils');

module.exports = function (gulp, plugins) {
  return function () {
    var target = gulp.src(utils.injectableDevAssetsRef(), {read: false});
    return gulp.src(join(PATH.src.all, 'index.html'))
      .pipe(plugins.inject(target, {transform: utils.transformPath(plugins, 'dev')}))
      .pipe(plugins.template(utils.templateLocals()))
      .pipe(gulp.dest(PATH.dest.dev.all));
  };
};
