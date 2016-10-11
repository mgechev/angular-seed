import * as del from 'del';
import { join } from 'path';

import Config from '../../config';

/**
 * Removes all the js, js.map from the tools directories
 */
export = () => {
  let source = [
    'gulpfile.js',
    'gulpfile.js.map',
    join(Config.TOOLS_DIR, '**/*.js'),
    join(Config.TOOLS_DIR, '**/*.js.map'),
  ];

  return del.sync(source);
};
