import * as express from 'express';
import * as gulp from 'gulp';
import { protractor } from 'gulp-protractor';

class Protractor {
  server(port: number, dir: string) {
    let app = express();
    app.use(express.static(dir));
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
