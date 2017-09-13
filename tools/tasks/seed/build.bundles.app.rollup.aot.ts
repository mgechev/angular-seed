import { parallel } from 'async';
import { writeFile } from 'fs';
import { join } from 'path';

import Config from '../../config';

const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const includePaths = require('rollup-plugin-includepaths');
const rollup = require('rollup');

const config = {
  entry: join(Config.TMP_DIR, Config.BOOTSTRAP_FACTORY_PROD_MODULE),
  sourceMap: true,
  treeshake: true,
  moduleName: 'main',
  plugins: [
    includePaths({
      include: {},
      paths: [join(Config.TMP_DIR, 'app')],
      external: [],
      extensions: ['.js', '.json', '.html', '.ts']
    }),
    nodeResolve({
      jsnext: true, main: true, module: true
    }),
    commonjs({ //See project.config.ts to extend
      include: Config.ROLLUP_INCLUDE_DIR,
      namedExports: Config.getRollupNamedExports()
    })
  ]
};


export = (done: any) => {
  rollup.rollup(config)
    .then((bundle: any) => {
      const result = bundle.generate({
        format: 'iife',
        sourceMap: Config.PRESERVE_SOURCE_MAPS
      });
      const path = join(Config.TMP_DIR, 'bundle.js');

      parallel(getTasks(path, result), (error: any, results: boolean[]) => {
        if (error && results.indexOf(false) === -1) {
          console.error(error);
          process.exit(0);
        }
        done();
      });
    })
    .catch((error: any) => {
      console.error(error);
      process.exit(0);
    });
};

function getTasks(path: string, result: any): any[] {
  const tasks = [
    (callback: any) =>
      writeFile(path,
        result.code + (Config.PRESERVE_SOURCE_MAPS ? '\n//# sourceMappingURL=bundle.js.map' : ''),
        (error: any) => callback(null, !error))
  ];
  if (Config.PRESERVE_SOURCE_MAPS) {
    tasks.push((callback: any) => writeFile(path + '.map',
      result.map.toString(),
      (error: any) => callback(null, !error)));
  }
  return tasks;
}
