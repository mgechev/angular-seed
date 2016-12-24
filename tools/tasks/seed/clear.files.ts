import { join } from 'path';
import { clean } from '../../utils';

import Config from '../../config';

/**
 * Removes all the js, js.map and metadata.json from the src and tools directories
 */
export = clean([
  'gulpfile.js',
  'gulpfile.js.map',
  join(Config.TOOLS_DIR, '**/*.js'),
  join(Config.TOOLS_DIR, '**/*.js.map'),
  join(Config.TOOLS_DIR, '**/*.metadata.json'),
  join(Config.APP_SRC, '**/*.js'),
  join(Config.APP_SRC, '**/*.js.map'),
  join(Config.APP_SRC, '**/*.metadata.json')
]);

