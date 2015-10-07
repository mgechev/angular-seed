// Written in JS as executed before typings and packages
// allowing to use TypeScript are installed.
"use strict";


var exec = require('child_process').exec;
var fs = require('fs');
var join = require('path').join;

var TSD_CONFIG = fs.readFileSync(join(process.cwd(), 'tsd.json'));
var FOLDER_NAME = JSON.parse(TSD_CONFIG).path;
var TSD_TYPINGS = join(process.cwd(), FOLDER_NAME);

// Delete folder.
deleteFolder(TSD_TYPINGS, function () {
  console.log(FOLDER_NAME + ' folder cleaned successfully!');
});

// Install typings.
exec('tsd install', function (err, stdout) {
  if (err) return console.log(err);
  console.log(stdout);
});


function deleteFolder(path, cb) {
  if (!fs.existsSync(path)) return;

  walk(path);
  cb();

  function walk(path) {
    fs.readdirSync(path).forEach(function(file) {
      var curPath = join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        walk(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
