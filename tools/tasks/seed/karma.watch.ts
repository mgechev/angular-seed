import { startKarma } from '../../utils/seed/karma.start';
/**
 * Executes the build process, running all unit tests using `karma`.
 */
export = (done: any) => {
  return startKarma(done, {
    singleRun: false
  });
};
