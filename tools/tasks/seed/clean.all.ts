import { DIST_DIR, COVERAGE_DIR } from '../../config';
import { clean } from '../../utils';

/**
 * Executes the build process, cleaning all files within the `/dist` directory.
 */
export = clean([DIST_DIR, COVERAGE_DIR]);
