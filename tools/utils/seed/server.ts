import * as express from 'express';
import * as fallback from 'express-history-api-fallback';
import * as openResource from 'open';
import { resolve } from 'path';
import * as serveStatic from 'serve-static';

import * as codeChangeTool from './code_change_tools';
import { APP_BASE, COVERAGE_PORT, DOCS_DEST, DOCS_PORT, PORT, PROD_DEST } from '../../config';


export function serveSPA() {
  codeChangeTool.listen();
}

export function notifyLiveReload(e:any) {
  let fileName = e.path;
  codeChangeTool.changed(fileName);
}

export function serveDocs() {
  let server = express();

  server.use(
    APP_BASE,
    serveStatic(resolve(process.cwd(), DOCS_DEST))
  );

  server.listen(DOCS_PORT, () =>
    openResource('http://localhost:' + DOCS_PORT + APP_BASE)
  );
}

export function serveCoverage() {
  let server = express();

  server.use(
    APP_BASE,
    serveStatic(resolve(process.cwd(), 'coverage'))
  );

  server.listen(COVERAGE_PORT, () =>
    openResource('http://localhost:' + COVERAGE_PORT + APP_BASE)
  );
}

export function serveProd() {
  let root = resolve(process.cwd(), PROD_DEST);
  let server = express();

  server.use(APP_BASE, serveStatic(root));

  server.use(fallback('index.html', { root }));

  server.listen(PORT, () =>
    openResource('http://localhost:' + PORT + APP_BASE)
  );

};
