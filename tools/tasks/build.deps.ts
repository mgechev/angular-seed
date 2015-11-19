import {join} from 'path';
import {DEV_DEPENDENCIES} from '../config';

export = function buildDeps(gulp, plugins) {
  let tasks: any[] = [];
  let groups = groupBy(DEV_DEPENDENCIES, 'dest');
  setCopyFilesTasks();

  // Returns a tasks dependency array.
  return tasks;


  function setCopyFilesTasks() {
    Object.keys(groups).forEach(makeTask);
  }

  function makeTask(dest) {
    let taskName = `copy.${dest.split('/').pop()}`;
    tasks.push(taskName);
    gulp.task(taskName, function () {
      return gulp.src(mapDependenciesSource(groups[dest])).pipe(gulp.dest(dest));
    });
  }

  function mapDependenciesSource(paths: string[]): string[] {
    return paths.map(path => isGlob(path)
        ? join(process.cwd(), 'node_modules', path)
        : require.resolve(path));
  }

  function isGlob(path: string) {
    return /\*/.test(path);
  }

  function groupBy(collection: any[], key: string): any {
    let groups = {};
    collection.forEach(obj => {
      if (!groups[obj.dest]) groups[obj.dest] = [];
      groups[obj.dest].push(obj.src);
    });
    return groups;
  }
};
