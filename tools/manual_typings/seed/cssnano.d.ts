declare module 'cssnano' {

  interface IOptions {
    discardComments?: {
      removeAll: boolean;
    };
    discardUnused?: boolean;
    zindex?: boolean;
    reduceIdents?: boolean;
  }

  interface ICssnano {
    (opts?: IOptions): NodeJS.ReadWriteStream;
  }

  const cssnano: ICssnano;
  export = cssnano;
}
