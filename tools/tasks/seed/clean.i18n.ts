import { clean } from '../../utils';
import { join } from 'path';

import Config from '../../config';

/**
 * Removes the tsconfig.i18n.json file that ng-xi18n puts in the dev folder when extracting the base language messages.
 *
 */
export = clean(join(Config.DEV_DEST, 'tsconfig.i18n.json'));

