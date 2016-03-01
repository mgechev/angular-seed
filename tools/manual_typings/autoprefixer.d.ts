declare module 'autoprefixer' {
  interface Options {
    browsers?: string | string[]
  }
  function autoprefixer(options: Options): NodeJS.ReadWriteStream;
  module autoprefixer {}
  export = autoprefixer;
}
