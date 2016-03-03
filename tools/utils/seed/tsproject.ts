import * as gulpLoadPlugins from 'gulp-load-plugins';
const plugins = <any>gulpLoadPlugins();

export function makeTsProject() {
  return plugins.typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
}
