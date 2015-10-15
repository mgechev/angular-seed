"use strict";

var exec = require('child_process').exec;

exec('npm install tsd', installTypings);


function installTypings(err, stdout) {
  if (err) return console.log(err);
  console.log(stdout);

  exec('tsd install --clean', function cb(err, stdout) {
    if (err) return console.log(err);
    console.log(stdout);
  });
}
