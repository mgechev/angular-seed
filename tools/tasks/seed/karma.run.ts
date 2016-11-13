import { startKarma } from '../../utils/seed/karma.start';
import Config from '../../config';

/**
 * Executes the build process, running all unit tests using `karma`.
 */
export = (done: any) => {
  return startKarma(done, Config.getKarmaReporters());
};
