import { startKarma } from '../../utils/seed/karma.start';
/**
 * Executes the build process, running all unit tests using `karma`.
 */
export = (done: any) => setTimeout(() => {
  return startKarma(done, {
    singleRun: false
  });
},
// On some OS, the default max opened file descriptor limit might cause karma to not start.
// By setting this timeout, there should be enough time before other tasks release the descriptors.
// Karma itself can have as many opened files as it needs, it uses graceful-fs.
1000);
