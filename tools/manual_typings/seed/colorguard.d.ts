declare module 'colorguard' {

  interface IOptions {
    ignore?: string[];
    threshold?: number;
    whitelist?: string[];
  }

  interface IColorguard {
    (opts?: IOptions): NodeJS.ReadWriteStream;
  }

  const colorguard: IColorguard;
  export = colorguard;
}
