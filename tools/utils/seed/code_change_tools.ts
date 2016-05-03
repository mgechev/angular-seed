import {BROWSER_SYNC_CONFIG} from '../../config';
import * as browserSync from 'browser-sync';
import * as path from 'path';

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

  let onlyStylesChanged =
    files
      .map((f:string) => path.parse(f).ext)
      .reduce((prev:string, current:string) => prev && (current === '.scss' || current === '.css'), true);

  // if (ENABLE_HOT_LOADING) {
  //   ng2HotLoader.onChange(files);
  // } else {
  //TODO: Figure out why you can't pass a file to reload
  if (onlyStylesChanged === false) {
    browserSync.reload(files);
  }else {
    browserSync.reload('*.css');
  }
  //}
};

export { listen, changed };
