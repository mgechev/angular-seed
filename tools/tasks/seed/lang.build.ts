import * as runSequence from 'run-sequence';
import Config from '../../config';

export = () => {
    Config.BUILD_TYPE = 'prod';
    runSequence('clean.tmp','copy.prod','build.html_css');
};
