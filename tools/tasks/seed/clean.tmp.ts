import Config from '../../config';
import { clean } from '../../utils';

/**
 * Executes the build process, cleaning all files within the `dist/tmp` directory.
 */
export = clean([Config.TMP_DIR]);
