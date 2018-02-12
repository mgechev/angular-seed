import * as express from 'express';
import * as history from 'express-history-api-fallback';
import { resolve } from 'path';
import { spawn } from 'child_process';
import Config from '../../config';

const isWin = /^win/.test(process.platform);

class E2E {
  server(port: number, dir: string) {
    const app = express();
    const root = resolve(process.cwd(), dir);
    for (const proxy of Config.PROXY_MIDDLEWARE) {
      app.use(proxy);
    }
    app.use(Config.APP_BASE, express.static(root));
    app.use(history('index.html', {root}));
    return new Promise((resolve) => {
      const server = app.listen(port, () => {
        resolve(server);
      });
    });
  }
}

/**
 * Serves the application and runs e2e tests.
 */
export = (done: any) => {
  process.env.LANG = 'en_US.UTF-8';
  const cypress = isWin ? '.\\node_modules\\.bin\\cypress.cmd' : './node_modules/.bin/cypress';
  new E2E()
    .server(Config.PORT, Config.PROD_DEST)
    .then((server: any) => {
      spawn(cypress, ['run', '--config', `baseUrl=${getBaseUrl()}`], {stdio: 'inherit'})
        .on('close', (code: number) => {
          server.close(done);
          process.exit(code);
        });
    });
};

function getBaseUrl() {
  return `http://localhost:${Config.PORT}${Config.APP_BASE}`;
}
