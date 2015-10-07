declare module 'yargs' {
  var yargs: IYargs;
  export = yargs;

  // Minimalistic but serves the usage in the seed.
  interface IYargs {
    argv: any;
  }
}
