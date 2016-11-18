declare module 'express-history-api-fallback' {

  import { RequestHandler } from 'express';

  interface IOptions {
    maxAge?: number;
    root?: string;
    lastModified?: number;
    headers?: { [key: string]: string; };
    dotfiles?: boolean;
  }

  function fallback(index: string, options?: IOptions): RequestHandler;

  module fallback {}

  export = fallback;
}
