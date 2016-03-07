import {
  PORT,
  APP_DEST,
  APP_BASE,
  DIST_DIR,
  PROXY_PATH,
  PROXY_HOST,
  PROXY_PORT,
  PROXY_PROTOCOL,
  PROXY_LOCAL_PATH
} from '../../config';
import * as browserSync from 'browser-sync';
const proxy = require('proxy-middleware');

let runServer = () => {
  let baseDir = APP_DEST;
  let routes:any = {
    [`${APP_BASE}${APP_DEST}`]: APP_DEST,
    [`${APP_BASE}node_modules`]: 'node_modules',
  };

  if (APP_BASE !== '/') {
    routes[`${APP_BASE}`] = APP_DEST;
    baseDir = `${DIST_DIR}/empty/`;
  }

  let browserSyncMiddleswares = [];
  if(PROXY_HOST) {
    let proxyOptions = {
      protocol: PROXY_PROTOCOL.indexOf(':') > -1 ? PROXY_PROTOCOL : PROXY_PROTOCOL + ':',
      hostname: PROXY_HOST,
      port: PROXY_PORT,
      pathname: PROXY_PATH,
      route: PROXY_LOCAL_PATH
    };
    browserSyncMiddleswares.push(proxy(proxyOptions));
  }

  browserSyncMiddleswares.push(require('connect-history-api-fallback')({index: `${APP_BASE}index.html`}));

  browserSync({
    port: PORT,
    startPath: APP_BASE,
    server: {
      baseDir: baseDir,
      middleware: browserSyncMiddleswares,
      routes: routes
    }
  });
};

let listen = () => {
  // if (ENABLE_HOT_LOADING) {
  //   ng2HotLoader.listen({
  //     port: HOT_LOADER_PORT,
  //     processPath: file => {
  //       return file.replace(join(PROJECT_ROOT, APP_SRC), join('dist', 'dev'));
  //     }
  //   });
  // }
  runServer();
};

let changed = files => {
  if (!(files instanceof Array)) {
    files = [files];
  }
  // if (ENABLE_HOT_LOADING) {
  //   ng2HotLoader.onChange(files);
  // } else {
  browserSync.reload(files);
  //}
};

export { listen, changed };
