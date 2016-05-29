import * as browserSync from 'browser-sync';
// import * as path from 'path';

import { getPluginConfig } from '../../config';

/**
 * Initialises BrowserSync with the configuration defined in seed.config.ts (or if overriden: project.config.ts).
 */
let runServer = () => {
  browserSync.init(getPluginConfig('browser-sync'));
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
