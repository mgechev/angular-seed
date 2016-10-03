import Config from '../../config';
import { clean } from '../../utils';

/**
 * Executes the build process, cleaning all files within the `/dist` directory.
 */
export = clean([Config.DIST_DIR, Config.COVERAGE_DIR]);
