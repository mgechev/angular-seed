// Written in JS as executed before types defintions are installed.
"use strict";

var fs = require('fs');
var join = require('path').join;

var TSD_CONFIG = fs.readFileSync(join(process.cwd(), 'tsd.json'));
var FOLDER_NAME = JSON.parse(TSD_CONFIG).path;
var TSD_TYPINGS = join(process.cwd(), FOLDER_NAME);

// Delete tsd typings folder.
deleteFolder(TSD_TYPINGS, function () {
  console.log(FOLDER_NAME + ' folder cleaned successfully!');
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
