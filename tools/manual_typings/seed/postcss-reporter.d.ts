declare module 'postcss-reporter' {

  interface IOptions {
    clearMessages?: boolean;
    formatter?: Function;
    plugins?: string[];
    throwError?: boolean;
    sortByPosition?: boolean;
    positionless?: string;
    noIcon?: boolean;
    noPlugin?: boolean;
  }

  interface IPostcssReporter {
    (opts?: IOptions): NodeJS.ReadWriteStream;
  }

  const postcssReporter: IPostcssReporter;
  export = postcssReporter;
}
