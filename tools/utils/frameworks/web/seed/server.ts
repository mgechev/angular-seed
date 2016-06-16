import * as express from 'express';
import * as fallback from 'express-history-api-fallback';
import * as openResource from 'open';
import { resolve } from 'path';
import * as serveStatic from 'serve-static';

import * as codeChangeTool from './code_change_tools';
import { WEB_APP_BASE, WEB_COVERAGE_PORT, WEB_DOCS_DEST, WEB_DOCS_PORT, WEB_PORT, WEB_PROD_DEST } from '../../../../config';

/**
 * Serves the Single Page Application. More specifically, calls the `listen` method, which itself launches BrowserSync.
 */
export function serveSPA() {
  codeChangeTool.listen();
}

/**
 * This utility method is used to notify that a file change has happened and subsequently calls the `changed` method,
 * which itself initiates a BrowserSync reload.
 * @param {any} e - The file that has changed.
 */
export function notifyLiveReload(e:any) {
  let fileName = e.path;
  codeChangeTool.changed(fileName);
}

/**
 * Starts a new `express` server, serving the static documentation files.
 */
export function serveDocs() {
  let server = express();

  server.use(
    WEB_APP_BASE,
    serveStatic(resolve(process.cwd(), WEB_DOCS_DEST))
  );

  server.listen(WEB_DOCS_PORT, () =>
    openResource('http://localhost:' + WEB_DOCS_PORT + WEB_APP_BASE)
  );
}

/**
 * Starts a new `express` server, serving the static unit test code coverage report.
 */
export function serveCoverage() {
  let server = express();

  server.use(
    WEB_APP_BASE,
    serveStatic(resolve(process.cwd(), 'coverage'))
  );

  server.listen(WEB_COVERAGE_PORT, () =>
    openResource('http://localhost:' + WEB_COVERAGE_PORT + WEB_APP_BASE)
  );
}

/**
 * Starts a new `express` server, serving the built files from `dist/prod`.
 */
export function serveProd() {
  let root = resolve(process.cwd(), WEB_PROD_DEST);
  let server = express();

  server.use(WEB_APP_BASE, serveStatic(root));

  server.use(fallback('index.html', { root }));

  server.listen(WEB_PORT, () =>
    openResource('http://localhost:' + WEB_PORT + WEB_APP_BASE)
  );
};
