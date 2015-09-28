"use strict";

var fs = require('fs');
var CONFIG = require('./workflow.config');
var PATH = CONFIG.PATH;
var path = require('path');
var join = path.join;
var slash = require('slash');

//serveSpa
var resolve = path.resolve;
var connectLivereload = require('connect-livereload');
var serveStatic = require('serve-static');
var openResource = require('open');
var express = require('express');
var minilr = require('mini-lr')();

// --------------
// Utils.

function notifyLiveReload(e) {
  var fileName = e.path;
  minilr.changed({
    body: {
      files: [fileName]
    }
  });
}
module.exports.notifyLiveReload = notifyLiveReload;

function livereload() {
  minilr.listen(CONFIG.LIVE_RELOAD_PORT);
}
module.exports.livereload = livereload;

function transformPath(plugins, env) {
  var v = '?v=' + getVersion();
  return function (filepath) {
    var filename = filepath.replace('/' + PATH.dest[env].all, '') + v;
    arguments[0] = join(CONFIG.APP_BASE, filename);
    return plugins.inject.transform.apply(plugins.inject.transform, arguments);
  };
}
module.exports.transformPath = transformPath;

function injectableDevAssetsRef() {
  var src = PATH.src.lib.map(function (path) {
    return join(PATH.dest.dev.lib, slash(path).split('/').pop());
  });
  return src;
}
module.exports.injectableDevAssetsRef = injectableDevAssetsRef;

function getVersion() {
  var pkg = JSON.parse(fs.readFileSync('package.json'));
  return pkg.version;
}

function templateLocals() {
  return {
    VERSION: getVersion(),
    APP_BASE: CONFIG.APP_BASE
  };
}
module.exports.templateLocals = templateLocals;

function tsProject(plugins) {
  return plugins.typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
}
module.exports.tsProject = tsProject;

function serveSPA(env) {
  var app = express();
  app.use(
    CONFIG.APP_BASE,
    connectLivereload( { port: CONFIG.LIVE_RELOAD_PORT }),
    serveStatic( resolve(process.cwd(), PATH.dest[env].all))
  );

  app.all(CONFIG.APP_BASE + '*', function (req, res) {
    res.sendFile(resolve(process.cwd(), PATH.dest[env].all, 'index.html'));
  });

  app.listen(CONFIG.PORT, function () {
    openResource('http://localhost:' + CONFIG.PORT + CONFIG.APP_BASE);
  });
}
module.exports.serveSPA = serveSPA;
