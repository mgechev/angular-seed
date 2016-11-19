import { watch } from '../../utils';
import Config from '../../config';

/**
 * Executes the build process, watching for file changes and rebuilding the e2e environment.
 */
export = watch('build.e2e', Config.E2E_SRC);
