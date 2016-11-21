import * as browserSync from 'browser-sync';
import * as path from 'path';

import Config from '../../config';

class ChangeFileManager {
  private _files: string[] = [];
  private _pristine = true;

  get lastChangedFiles() {
    return this._files.slice();
  }

  get pristine() {
    return this._pristine;
  }

  addFile(file: string) {
    this._pristine = false;
    this._files.push(file);
  }

  addFiles(files: string[]) {
    files.forEach(f => this.addFile(f));
  }

  clear() {
    this._files = [];
  }
}

export let changeFileManager = new ChangeFileManager();

/**
 * Initialises BrowserSync with the configuration defined in seed.config.ts (or if overriden: project.config.ts).
 */
let runServer = () => {
  browserSync.init(Config.getPluginConfig('browser-sync'));
};

/**
 * Runs BrowserSync as the listening process for the application.
 */
let listen = () => {
  runServer();
};

/**
 * Provides a flag to mark which files have changed and reloads BrowserSync accordingly.
 */
let changed = (files: any) => {
  if (!(files instanceof Array)) {
    files = [files];
  }

  let onlyStylesChanged =
    files
      .map((f: string) => path.parse(f).ext)
      .reduce((prev: string, current: string) => prev && Config.BS_INJECT_FILE_TYPES.indexOf(current) !== -1, true);

  // trigger a browserSync inject/reload accordingly 
  if (onlyStylesChanged) {
    browserSync.reload(Config.CSS_PROD_BUNDLE);
  } else {
    browserSync.reload(files);
  }

};

export { listen, changed };