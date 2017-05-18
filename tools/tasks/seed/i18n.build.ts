import * as runSequence from 'run-sequence';
import Config from '../../config';

export = () => {
  runSequence('clean.tmp','copy.prod','build.html_css');
};
