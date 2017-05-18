import * as runSequence from 'run-sequence';
import Config from '../../config';

export = () => {
  runSequence('clean.prod','copy.prod','build.html_css');
};
