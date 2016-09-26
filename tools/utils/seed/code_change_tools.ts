import { PORT, APP_DEST, APP_BASE, DIST_DIR } from '../../config';
import * as browserSync from 'browser-sync';
/*<<<<<<< HEAD 26 sep
const proxy = require('proxy-middleware');
=======*/
// import * as path from 'path';

import Config from '../../config';
//>>>>>>> eb8c13ee984e8a813ed6f6b8c4bf68dba52a49ec

/**
 * Initialises BrowserSync with the configuration defined in seed.config.ts (or if overriden: project.config.ts).
 */
let runServer = () => {
/*<<<<<<< HEAD 26 sep
  //browserSync.init(BROWSER_SYNC_CONFIG);
  let baseDir = APP_DEST;
  let routes: any = {
    [`${APP_BASE}${APP_DEST}`]: APP_DEST,
    [`${APP_BASE}node_modules`]: 'node_modules',
  };

  if (APP_BASE !== '/') {
    routes[`${APP_BASE}`] = APP_DEST;
    baseDir = `${DIST_DIR}/empty/`;
  }

  browserSync({
    port: PORT,
    startPath: APP_BASE,
    server: {
      baseDir: baseDir,
      middleware: [
        // Connect to Sharepoint backend server. 
        proxy({
          protocol: 'http:',
          hostname: '192.168.101.124',
          port: 8001,
          pathname: '/api',
          route: '/api'

        }),
        //    Connect to localhost backend server. 
        // proxy({
        //   proxy({
        //   protocol: 'http:',
        //   hostname: 'localhost',
        //   port: 3000,
        //   pathname: '/api',
        //   route: '/api'
        // }),
        // Connect to Heroku backend server. 
        // proxy({
        //   protocol: 'https:',
        //   hostname: 'powerful-lowlands-67740.herokuapp.com',
        //   //port: ,
        //   pathname: '/api',
        //   route: '/api'
        // }),


        require('connect-history-api-fallback')({ index: `${APP_BASE}index.html` })
      ],
      routes: routes
    }
  });
=======*/
  browserSync.init(Config.getPluginConfig('browser-sync'));
//>>>>>>> eb8c13ee984e8a813ed6f6b8c4bf68dba52a49ec
};

/**
 * Runs BrowserSync as the listening process for the application.
 */
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

/**
 * Provides a flag to mark which files have changed and reloads BrowserSync accordingly.
 */
let changed = (files: any) => {
  if (!(files instanceof Array)) {
    files = [files];
  }

  //  let onlyStylesChanged =
  //    files
  //      .map((f:string) => path.parse(f).ext)
  //      .reduce((prev:string, current:string) => prev && (current === '.scss' || current === '.css'), true);
  //
  // if (ENABLE_HOT_LOADING) {
  //   ng2HotLoader.onChange(files);
  // } else {
  //TODO: Figure out why you can't pass a file to reload
  // if (onlyStylesChanged === false) {
  browserSync.reload(files);
  // } else {
  //   browserSync.reload('*.css');
  // }
  //}
};

export { listen, changed };
