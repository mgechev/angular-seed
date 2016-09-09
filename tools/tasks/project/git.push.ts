import {GIT_CONFIG } from '../../config';

import * as gulpLoadPlugins from 'gulp-load-plugins';

const plugins = < any > gulpLoadPlugins();

export = (done: any) => {
    var options: any = {
        args: '--follow-tags'
    };

    return plugins.git.push(
        GIT_CONFIG.release_push_origin,
        GIT_CONFIG.release_push_branch,
        options,
        (error: any) => {
            if (error) {
                throw error;
            } else {
                done();
            }
        });
};
