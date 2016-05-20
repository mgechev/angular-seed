import * as gulpLoadPlugins from 'gulp-load-plugins';

const plugins = <any>gulpLoadPlugins();

let tsProject: any;

/**
 * Creates a TypeScript project with the given options using the gulp typescript plugin.
 * @param {Object} options - The additional options for the project configuration.
 */
export function makeTsProject(options?: Object) {
  if (!tsProject) {
    const config = Object.assign({
      typescript: require('typescript')
    }, options);
    tsProject = plugins.typescript.createProject('tsconfig.json', config);
  }
  return tsProject;
}
