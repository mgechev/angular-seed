import * as express from 'express';
import * as history from 'express-history-api-fallback';
import * as gulp from 'gulp';
import { resolve, join } from 'path';
import { protractor } from 'gulp-protractor';
import Config from '../../config';

class Protractor {
  server(port: number, dir: string) {
    let app = express();
    let root = resolve(process.cwd(), dir);
    for (let proxy of Config.PROXY_MIDDLEWARE) {
      app.use(proxy);
    }
    app.use(express.static(root));
    app.use(history('index.html', { root }));
    return new Promise((resolve, reject) => {
      let server = app.listen(port, () => {
        resolve(server);
      });
    });
  }
}

/**
 * Executes the build process, running all e2e specs using `protractor`.
 */
export = (done: any) => {
  process.env.LANG = 'en_US.UTF-8';
  new Protractor()
    .server(Config.PORT, Config.PROD_DEST)
    .then((server: any) => {
      gulp
        .src(join(Config.DEV_DEST, '**/*.e2e-spec.js'))
        .pipe(protractor({ configFile: 'protractor.conf.js' }))
        .on('error', (error: string) => { throw error; })
        .on('end', () => { server.close(done); });
    });
};
