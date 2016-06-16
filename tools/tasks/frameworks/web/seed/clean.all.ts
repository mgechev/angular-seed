import { WEB_DIST_DIR } from '../../../../config';
import { clean } from '../../../../utils';

/**
 * Executes the build process, cleaning all files within the `/dist` directory.
 */
export = clean(WEB_DIST_DIR);
