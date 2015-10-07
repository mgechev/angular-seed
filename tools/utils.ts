import fs = require('fs');
import path = require('path');
import slash = require('slash');

// Server dependencies.
import connectLivereload = require('connect-livereload');
import serveStatic = require('serve-static');
import openResource = require('open');
import express = require('express');
import minilrFn = require('mini-lr');

import CONFIG = require('./workflow.config');

const PATH = CONFIG.PATH;
const join = path.join;
const resolve = path.resolve;
let minilr = minilrFn();

// --------------
// Utils.

export function notifyLiveReload(e) {
  var fileName = e.path;
  minilr.changed({
    body: { files: [fileName] }
  });
}

export function livereload() {
  minilr.listen(CONFIG.LIVE_RELOAD_PORT);
}

export function transformPath(plugins, env) {
  var v = '?v=' + getVersion();
  return function (filepath) {
    var filename = filepath.replace('/' + PATH.dest[env].all, '') + v;
    arguments[0] = join(CONFIG.APP_BASE, filename);
    return plugins.inject.transform.apply(plugins.inject.transform, arguments);
  };
}

export function injectableDevAssetsRef() {
  return PATH.src.lib_inject.map(path =>
    join(PATH.dest.dev.lib, slash(path).split('/').pop()));
}

export function templateLocals() {
  return {
    VERSION: getVersion(),
    APP_BASE: CONFIG.APP_BASE
  };
}

export function tsProject(plugins) {
  return plugins.typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
}

export function serveSPA(env) {
  var app = express();
  app.use(
    CONFIG.APP_BASE,
    connectLivereload( { port: CONFIG.LIVE_RELOAD_PORT }),
    serveStatic(resolve(process.cwd(), PATH.dest[env].all))
  );

  app.all(CONFIG.APP_BASE + '*', (req, res) =>
    res.sendFile(resolve(process.cwd(), PATH.dest[env].all, 'index.html'))
  );

  app.listen(CONFIG.PORT, () =>
    openResource('http://localhost:' + CONFIG.PORT + CONFIG.APP_BASE)
  );
}

function getVersion() {
  var pkg = JSON.parse(fs.readFileSync('package.json').toString());
  return pkg.version;
}
