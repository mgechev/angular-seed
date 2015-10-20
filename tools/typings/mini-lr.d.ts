declare module 'mini-lr' {
  function minilr(): IMinilr;
  module minilr {}
  export = minilr;

  interface IMinilr {
    changed(options: any): void;
    listen(port: number): void;
  }
}
