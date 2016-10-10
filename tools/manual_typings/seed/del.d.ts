declare module 'del' {
  var del: IDel;
  export = del;
  interface IDel {
    sync: {
      (patterns: any): void;
    };
  }
}
