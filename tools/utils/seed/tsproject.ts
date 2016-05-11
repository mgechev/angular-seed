import * as gulpLoadPlugins from 'gulp-load-plugins';

const plugins = <any>gulpLoadPlugins();

let _tsProject: any;

export function makeTsProject(options?: Object) {
  if (!_tsProject) {
    const config = Object.assign({
      typescript: require('typescript')
    }, options);
    _tsProject = plugins.typescript.createProject('tsconfig.json', config);
  }
  return _tsProject;
}
