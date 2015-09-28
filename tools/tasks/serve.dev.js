"use strict";

var runSequence = require('run-sequence');
var utils = require('../utils');
var CONFIG = require('../workflow.config');
var PATH = CONFIG.PATH;
var path = require('path');
var join = path.join;

module.exports = function (gulp, plugins) {
  return function () {
    plugins.watch(join(PATH.src.all, '**'), function (e) {
      runSequence('build.app.dev', function () {
        utils.notifyLiveReload(e);
      });
    });

    utils.serveSPA('dev');
  };
};

