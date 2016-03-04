import {PORT, APP_DEST, APP_BASE, DIST_DIR} from '../../config';
import * as browserSync from 'browser-sync';

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

  browserSync({
    middleware: [require('connect-history-api-fallback')({index: `${APP_BASE}index.html`})],
    port: PORT,
    startPath: APP_BASE,
    server: {
      baseDir: baseDir,
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
