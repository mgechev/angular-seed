declare module 'postcss-assets' {
  interface Options {
    relative?: boolean,
    cachebuster?: boolean | Function,
    basePath?: string,
    baseUrl?: string,
    loadPaths: string[]
  }
  function postCSSAssets(options: Options): NodeJS.ReadWriteStream;
  module postCSSAssets {}
  export = postCSSAssets;
}
