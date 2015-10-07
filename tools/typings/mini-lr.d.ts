declare module 'mini-lr' {
  function minilr(): IMinilr;
  export = minilr;

  interface IMinilr {
    changed(options: any): void;
    listen(port: number): void;
  }
}
