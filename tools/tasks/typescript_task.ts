import { Task } from './task';

export abstract class TypeScriptTask extends Task {
  shallRun(files: String[]) {
    return files.reduce((a, f) => {
      return a || f.endsWith('.ts');
    }, false);
  }
}
