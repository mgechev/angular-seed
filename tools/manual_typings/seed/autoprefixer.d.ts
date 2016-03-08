declare module 'autoprefixer' {

  interface IOptions {
    browsers: string[];
  }

  interface IAutoprefixer {
    (opts?: IOptions): NodeJS.ReadWriteStream;
  }

  const autoprefixer: IAutoprefixer;
  export = autoprefixer;
}
