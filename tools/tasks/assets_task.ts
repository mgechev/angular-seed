import { Task } from './task';

export abstract class AssetsTask extends Task {
  shallRun(files: String[]) {
    return files.reduce((a, f) => {
      return a || (!f.endsWith('.css') && !f.endsWith('.sass') &&
       !f.endsWith('.scss') && !f.endsWith('.ts'));
    }, false);
  }
}
