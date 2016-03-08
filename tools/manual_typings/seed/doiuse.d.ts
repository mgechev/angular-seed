declare module 'doiuse' {

  interface IOptions {
    browsers?: string[];
    ignore?: string[];
    ignoreFiles?: string[];
    onFeatureUsage?: Function;
  }

  interface IDoiuse {
    (opts?: IOptions): NodeJS.ReadWriteStream;
  }

  const doiuse: IDoiuse;
  export = doiuse;
}
