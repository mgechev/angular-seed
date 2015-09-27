"use strict";

module.exports = function (gulp, plugins, config) {

    return function () {
        plugins.watch('./app/**', function() {
            gulp.start('build.test');
        });
    };
};