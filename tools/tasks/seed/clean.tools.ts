import * as rimraf from 'rimraf';
import { join } from 'path';

import Config from '../../config';

/**
 * Removes all the js, js.map from the tools directories
 *
 * NB: this needs to remain syncronus, or check.tools will
 * need to be updated to handle the returned promise/stream
 *
 */
export = () => {
  let source = [
    'gulpfile.js',
    'gulpfile.js.map',
    join(Config.TOOLS_DIR, '**/*.js'),
    join(Config.TOOLS_DIR, '**/*.js.map'),
  ];

  return source.forEach(p => rimraf.sync(p));
};
