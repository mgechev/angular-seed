import { COVERAGE_DIR } from '../../config';
import { clean } from '../../utils';

/**
 * Executes the build process, cleaning all files within the `/dist/dev` directory.
 */
export = clean(COVERAGE_DIR);
