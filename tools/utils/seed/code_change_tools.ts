import {BROWSER_SYNC_CONFIG} from '../../config';
import * as browserSync from 'browser-sync';

let runServer = () => {
  browserSync.init(BROWSER_SYNC_CONFIG);
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

let changed = (files: any) => {
  if (!(files instanceof Array)) {
    files = [files];
  }
  // if (ENABLE_HOT_LOADING) {
  //   ng2HotLoader.onChange(files);
  // } else {
  //TODO: Figure out why you can't pass a file to reload
  browserSync.reload(files.path);
  //}
};

export { listen, changed };
