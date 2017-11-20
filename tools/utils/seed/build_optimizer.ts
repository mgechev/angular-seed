import * as through from 'through2';
import { buildOptimizer } from '@angular-devkit/build-optimizer';

const inlineSourceMap = (map: any) => {
  return '// # sourceMappingURL=data:application/json;base64,' + new Buffer(JSON.stringify(map)).toString('base64');
};

export const ngBuildOptimizer = () => {
  return through.obj(function(file: any, encoding: any, callback: any) {
    if (file.isNull()) {
      // nothing to do
      return callback(null, file);
    }

    if (file.isBuffer()) {
      const res = buildOptimizer({
        content: file.contents.toString(),
        emitSourceMap: true
      });
      if (res.content) {
        file.contents = Buffer.from(res.content + inlineSourceMap(res.sourceMap), encoding);
      }
      return callback(null, file);
    }
  });
};
