"use strict";

var execSync = require('child_process').execSync;

try {
  var stdout = execSync('npm install tsd');
  installTypings(null, stdout.toString());
} catch (e) {
  installTypings(e, null);
}

function installTypings(err, stdout) {
  if (err) return console.log(err);
  console.log(stdout);

  execSync('tsd install --clean');
}

