import * as runSequence from 'run-sequence';

export = () => {
  runSequence('clean.prod', 'copy.prod', 'build.html_css');
};
