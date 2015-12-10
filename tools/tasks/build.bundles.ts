import {parallel} from 'async';
import {join} from 'path';
import * as Builder from 'systemjs-builder';
import {BUNDLES_DEST, SYSTEM_CONFIG_BUILDER} from '../config';

const BUNDLE_OPTS = {
  minify: true,
  sourceMaps: true,
  format: 'cjs'
};

export = function bundles(gulp, plugins) {
  return function (done) {
    let builder = new Builder(SYSTEM_CONFIG_BUILDER);

    parallel([
      bundleApp
    ], () => done());

    function bundleApp(done) {
      builder.bundle(
        'bootstrap - angular2/*',
        join(BUNDLES_DEST, 'app.js'), BUNDLE_OPTS).then(done);
    }
  };
};
