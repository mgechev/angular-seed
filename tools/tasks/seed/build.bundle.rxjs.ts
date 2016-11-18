/**
 * Temporary fix. See https://github.com/angular/angular/issues/9359
 */

const Builder = require('systemjs-builder');

export = (done: any) => {
  const options = {
    normalize: true,
    runtime: false,
    sourceMaps: true,
    sourceMapContents: true,
    minify: true,
    mangle: false
  };
  var builder = new Builder('./');
  builder.config({
    paths: {
      'n:*': 'node_modules/*',
      'rxjs/*': 'node_modules/rxjs/*.js',
    },
    map: {
      'rxjs': 'n:rxjs',
    },
    packages: {
      'rxjs': {main: 'Rx.js', defaultExtension: 'js'},
    }
  });
  builder.bundle('rxjs', 'node_modules/.tmp/Rx.min.js', options)
    .then(() => done())
    .catch((error:any) => done(error));
};
