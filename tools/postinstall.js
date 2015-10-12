// Written in JS as executed before types defintions are installed.
"use strict";

var async = require('async');
var exec = require('child_process').exec;

async.series([
  tsdInstall,
  tsdLink,
  tsdRebundle,
  npmPrune,
  gulpPostinstall
], function (err) {
  if (err) console.log(err);
});


function tsdInstall(done) {
  exec('tsd install', callback(done));
}

function tsdLink(done) {
  exec('tsd link', callback(done));
}

function tsdRebundle(done) {
  exec('tsd rebundle', callback(done));
}

function npmPrune(done) {
  exec('npm prune', callback(done));
}

function gulpPostinstall(done) {
  exec('gulp postinstall', callback(done));
}

function callback(done) {
  return function (err, stdout) {
    if (err) return console.log(err);
    console.log(stdout);
    done();
  };
}
