import * as slash from 'slash';
import {join} from 'path';
import {APP_BASE, PATH, VERSION} from '../config';

let injectables: string[] = [];

export function injectableAssetsRef() {
  return injectables;
}

export function registerInjectableAssetsRef(paths: string[], target: string = '') {
  injectables = injectables.concat(
    paths
      .filter(path => !/(\.map)$/.test(path))
      .map(path => join(target, slash(path).split('/').pop()))
  );
}

export function transformPath(plugins, env) {
  let v = '?v=' + VERSION;
  return function (filepath) {
    let filename = filepath.replace('/' + PATH.dest[env].all, '') + v;
    arguments[0] = join(APP_BASE, filename);
    return plugins.inject.transform.apply(plugins.inject.transform, arguments);
  };
}
