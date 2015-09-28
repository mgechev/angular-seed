"use strict";

var karma = require('karma').server;
var path = require('path');
var join = path.join;

module.exports = function (gulp, plugins, config) {
  return function (done) {
    karma.start({
      configFile: join(__dirname, '../../karma.conf.js'),
      singleRun: true
    }, done);
  };
};