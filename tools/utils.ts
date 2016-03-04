export * from './utils/template_locals';
export * from './utils/server';
export * from './utils/tasks_tools';

var _tsProject;

export function tsProjectFn(plugins) {
  if(!_tsProject) {
    _tsProject = plugins.typescript.createProject('tsconfig.json', {
      typescript: require('typescript')
    });
  }
  return _tsProject;
}
