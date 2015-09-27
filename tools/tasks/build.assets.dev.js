"use strict";

var path = require('path');
var join = path.join;
var PATH = require('../workflow.config').PATH;

module.exports = function (gulp, plugins) {

    return function () {
        return gulp.src([join(PATH.src.all, '**/*.html'), join(PATH.src.all, '**/*.css')])
            .pipe(gulp.dest(PATH.dest.dev.all));

    };
};