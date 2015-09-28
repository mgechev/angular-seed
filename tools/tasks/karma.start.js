"use strict";

var karma = require('karma').server;
var path = require('path');
var join = path.join;

module.exports = function () {
  return function (done) {
    karma.start({
      configFile: join(process.cwd(), 'karma.conf.js'),
      singleRun: true
    }, done);
  };
};
