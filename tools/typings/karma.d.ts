// Use this minimalistic definition file as bluebird dependency
// generate a lot of errors.

declare module 'karma' {
  var karma: IKarma;
  export = karma;
  interface IKarma {
    server: {
      start(options: any, callback: Function): void
    };
  }
}
