import * as gulpLoadPlugins from 'gulp-load-plugins';
const plugins = <any>gulpLoadPlugins();

let _tsProject: any;

export function makeTsProject() {
  if (!_tsProject) {
    _tsProject = plugins.typescript.createProject('tsconfig.json', {
      typescript: require('typescript')
    });
  }
  return _tsProject;
}
