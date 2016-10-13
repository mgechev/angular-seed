import Config from '../../config';
import { writeFile } from 'fs';
import { join } from 'path';

const nodeResolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup');

class RollupNG2 {
  resolveId(id: string, from: string) {
    if (id.startsWith('rxjs/')) {
      return `${__dirname}/../../../node_modules/rxjs-es/${id.replace('rxjs/', '')}.js`;
    }
    return undefined;
  }
}

const rollupNG2 = () => new RollupNG2();

const config = {
  entry: join(Config.TMP_DIR, Config.BOOTSTRAP_FACTORY_PROD_MODULE),
  sourceMap: true,
  treeshake: true,
  moduleName: 'main',
  plugins: [
    rollupNG2(),
    nodeResolve({
      jsnext: true, main: true, module: true
    })
  ]
};


export = (done: any) => {
  rollup.rollup(config)
    .then((bundle: any) => {
      var result = bundle.generate({
        format: 'iife'
      });
      const path = join(Config.TMP_DIR, 'bundle.js');
      writeFile(path, result.code, (error: any) => {
        if (error) {
          console.error(error);
          process.exit(0);
        }
        done();
      });
    }, function (error: any) {
      console.error(error);
      process.exit(0);
    });
};

