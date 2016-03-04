declare module 'postcss-reporter' {
  interface Options {
    clearMessages?: boolean
  }
  function postcssReporter(options: Options): NodeJS.ReadWriteStream;
  module postcssReporter {}
  export = postcssReporter;
}
