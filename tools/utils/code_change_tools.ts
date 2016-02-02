import * as express from 'express';
import * as connectLivereload from 'connect-livereload';
import {ENABLE_HOT_LOADING, LIVE_RELOAD_PORT, HOT_LOADER_PORT, APP_SRC, APP_BASE, PROJECT_ROOT} from '../config';
import * as ng2HotLoader from 'angular2-hot-loader';
import * as tinylrFn from 'tiny-lr';
import {join} from 'path';

let tinylr = tinylrFn();
let listen = () => {
  if (ENABLE_HOT_LOADING) {
    return ng2HotLoader.listen({
      port: HOT_LOADER_PORT,
      processPath: file => {
        return file.replace(join(PROJECT_ROOT, APP_SRC), join('dist', 'dev'));
      }
    });
  } else {
    return tinylr.listen(LIVE_RELOAD_PORT);
  }
};

let changed = files => {
  if (!(files instanceof Array)) {
    files = [files];
  }
  if (ENABLE_HOT_LOADING) {
    ng2HotLoader.onChange(files);
  } else {
    tinylr.changed({
      body: { files }
    });
  }
};

let tinylrMiddleware = connectLivereload({ port: LIVE_RELOAD_PORT });
let middleware = [
  APP_BASE,
  (req, res, next) => {
    if (ENABLE_HOT_LOADING) {
      next();
    } else {
      tinylrMiddleware(req, res, next);
    }
  },
  express.static(process.cwd())
];

export { listen, changed, middleware };
