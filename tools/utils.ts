import {readFileSync} from 'fs';
import {join, resolve} from 'path';
import * as slash from 'slash';

// Server dependencies.
import * as connectLivereload from 'connect-livereload';
import * as serveStatic from 'serve-static';
import * as openResource from 'open';
import * as express from 'express';
import * as minilrFn from 'mini-lr';

import {PATH, LIVE_RELOAD_PORT, APP_BASE, PORT} from './workflow.config';

let minilr = minilrFn();

// --------------
// Utils.

export function notifyLiveReload(e) {
  let fileName = e.path;

  minilr.changed({
    body: {files: [fileName]}
  });
}

export function livereload() {
  minilr.listen(LIVE_RELOAD_PORT);
}

export function transformPath(plugins, env) {
  let v = '?v=' + getVersion();

  return function (filepath) {
    let filename = filepath.replace('/' + PATH.dest[env].all, '') + v;

    arguments[0] = join(APP_BASE, filename);

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
    APP_BASE: APP_BASE
  };
}

export function tsProject(plugins) {
  return plugins.typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
}

export function serveSPA(env) {
  let app = express();

  app.use(
    APP_BASE,
    connectLivereload({port: LIVE_RELOAD_PORT}),
    serveStatic(resolve(process.cwd(), PATH.dest[env].all))
  );

  app.all(APP_BASE + '*', (req, res) =>
    res.sendFile(resolve(process.cwd(), PATH.dest[env].all, 'index.html'))
  );

  app.listen(PORT, () =>
    openResource('http://localhost:' + PORT + APP_BASE)
  );
}

function getVersion() {
  let pkg = JSON.parse(readFileSync('package.json').toString());

  return pkg.version;
}
