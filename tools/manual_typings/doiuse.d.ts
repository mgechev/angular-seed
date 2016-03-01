declare module 'doiuse' {
  interface Options {
    browsers?: string | string[]
  }
  function doiuse(options: Options): NodeJS.ReadWriteStream;
  module doiuse {}
  export = doiuse;
}
