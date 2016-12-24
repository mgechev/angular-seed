import { clean } from '../../utils';
import { join } from 'path';

import Config from '../../config';

/**
 * Removes all the js, js.map from the tools directories
 *
 * NB: this needs to remain syncronus, or check.tools will
 * need to be updated to handle the returned promise/stream
 *
 */
export = clean([
  'gulpfile.js',
  'gulpfile.js.map',
  join(Config.TOOLS_DIR, '**/*.js'),
  join(Config.TOOLS_DIR, '**/*.js.map')
]);

