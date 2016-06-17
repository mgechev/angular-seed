import * as express from 'express';
import * as history from 'express-history-api-fallback';
import * as gulp from 'gulp';
import { resolve } from 'path';
import { protractor } from 'gulp-protractor';

class Protractor {
  server(port: number, dir: string) {
    let app = express();
    let root = resolve(process.cwd(), dir);
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
  new Protractor()
    .server(5555, './dist/prod')
    .then((server: any) => {
      gulp
        .src('./dist/dev/**/*.e2e-spec.js')
        .pipe(protractor({ configFile: 'protractor.conf.js' }))
        .on('error', (error: string) => { throw error; })
        .on('end', () => { server.close(done); });
    });
};
