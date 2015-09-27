"use strict";

module.exports = function (gulp, plugins, config) {

    return function () {
        gulp.task('test', ['karma.start'], function() {
            plugins.watch('./app/**', function() {
                gulp.start('karma.start');
            });
        });

    };
};