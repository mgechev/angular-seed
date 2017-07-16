import Config from '../../config';
import { clean } from '../../utils';

/**
 * Executes the build process, cleaning all files within the `/sme` directory.
 */
export = clean([Config.SME_DIR]);
