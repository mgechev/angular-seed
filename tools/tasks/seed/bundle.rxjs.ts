
const Builder = require('systemjs-builder');
const promisify = require('util').promisify;
const fs = require('fs');

module.exports = () => {
  const options = {
    'normalize': true,
    'runtime': false,
    'sourceMaps': true,
    'sourceMapContents': false,
    'minify': true,
    'mangle': false
  };
  const builder = new Builder('./');
  builder.config({
    'paths': {
      'n:*': 'node_modules/*',
      'rxjs/*': 'node_modules/rxjs/*.js',
      'rxjs/internal-compatibility': 'node_modules/rxjs/internal-compatibility/index.js',
      'rxjs/testing': 'node_modules/rxjs/testing/index.js',
      'rxjs/ajax': 'node_modules/rxjs/ajax/index.js',
      'rxjs/operators': 'node_modules/rxjs/operators/index.js',
      'rxjs/webSocket': 'node_modules/rxjs/webSocket/index.js',
    },
    'map': {
      'rxjs': 'n:rxjs'
    },
    'packages': {
      'rxjs': { 'main': 'index.js',  'defaultExtension': 'js' }
    }
  });
  return builder.bundle('rxjs/index.js + ' +
  'rxjs/operators/index.js + ' +
  'rxjs/internal-compatibility/index.js + ' +
  'rxjs/testing/index.js + ' +
  'rxjs/ajax/index.js + ' +
  'rxjs/webSocket/index.js',
  'node_modules/.tmp/Rx.min.js', options)
    .then((output: any) => {
      const writeFile = promisify(fs.writeFile);
      const code = output.source.replace(/rxjs\/index/gm, 'rxjs');
      return writeFile('node_modules/.tmp/Rx.min.js',
        (options.sourceMaps)
          ? code + `\n//# sourceMappingURL=Rx.min.js.map`
          : code);
    });
};
