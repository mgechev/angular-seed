import { Task } from './task';
import Config from '../config';

export abstract class CssTask extends Task {

    // Is it still usefull if cache used ?
  shallRun(files: String[]) {
    return Config.ENABLE_SCSS || files.some(f =>
      f.endsWith('.css') || f.endsWith('.sass') || f.endsWith('.scss'));
  }

}
