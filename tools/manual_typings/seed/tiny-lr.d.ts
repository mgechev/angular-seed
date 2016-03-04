declare module 'tiny-lr' {
  function tinylr(): ITinylr;
  module tinylr {}
  export = tinylr;

  interface ITinylr {
    changed(options: any): void;
    listen(port: number): void;
  }
}
