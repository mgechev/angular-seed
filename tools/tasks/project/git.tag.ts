import * as gulpLoadPlugins from 'gulp-load-plugins';
import { GIT_CONFIG } from '../../config';

const plugins = < any > gulpLoadPlugins();

export = (done: any) => {

    return plugins.git.tag(
        GIT_CONFIG.release_tag,
        GIT_CONFIG.release_tag_title,
        (error:any) => {
            if (error) {
                throw error;
            } else {
                done();
            }
        });
};
