import { Task } from './task';

export abstract class CssTask extends Task {

  shallRun(files: String[]) {
    return files.some(f =>
      f.endsWith('.css') || f.endsWith('.sass') || f.endsWith('.scss'));
  }

}
