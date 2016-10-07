import * as del from 'del';
import { join } from 'path';

import Config from '../../config';

/**
 * Removes all the js, js.map and metadata.json from the src and tools directories
 */
export = () => {
  let source = [
    'gulpfile.js',
    'gulpfile.js.map',
    join(Config.TOOLS_DIR, '**/*.js'),
    join(Config.TOOLS_DIR, '**/*.js.map'),
    join(Config.TOOLS_DIR, '**/*.metadata.json'),
    join(Config.APP_SRC, '**/*.js'),
    join(Config.APP_SRC, '**/*.js.map'),
    join(Config.APP_SRC, '**/*.metadata.json')
  ];

  return del.sync(source);
};
