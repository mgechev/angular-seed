import * as util from 'gulp-util';
import Config from '../../config';

/**
 * This task extracts the git describe information and assigns the value to Config.GIT_DESCRIBE
 */
export = () => {
  let git = require('gulp-git');
  git.exec({args: 'describe'}, (err: any, stdout: any) => {
    if (err) {
      util.log('git describe error:', err);
    }
    Config.GIT_DESCRIBE = stdout.replace(/(\r\n|\n|\r)/gm, '');
  });
};
