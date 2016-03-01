declare module 'cssnano' {
  interface Options {
    discardComments?: Object
  }
  function cssnano(options: Options): NodeJS.ReadWriteStream;
  module cssnano {}
  export = cssnano;
}
