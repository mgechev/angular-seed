export * from './seed/template_locals';
export * from './seed/server';
export * from './seed/tasks_tools';

// TODO: move into ./seed
export function tsProjectFn(plugins) {
  return plugins.typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
}
