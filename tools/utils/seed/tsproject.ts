import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';

const plugins = <any>gulpLoadPlugins();

let tsProjects: any = {};

/**
 * Creates a TypeScript project with the given options using the gulp typescript plugin.
 * @param {Object} options - The additional options for the project configuration.
 */
export function makeTsProject(options: Object = {}) {
  let optionsHash = JSON.stringify(options);
  if (!tsProjects[optionsHash]) {
    let config = Object.assign({
      typescript: require('typescript')
    }, options);
    tsProjects[optionsHash] =
      plugins.typescript.createProject(join(Config.APP_SRC, 'tsconfig.json'), config);
  }
  return tsProjects[optionsHash];
}
