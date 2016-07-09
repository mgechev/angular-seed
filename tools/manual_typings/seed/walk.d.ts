declare module 'walk' {
  interface Walker {
    on(eventName: string, cb: Function): any;
  }
  interface Walk  {
    walk(path: string, options: any): Walker;
  }
  const walk: Walk;
  export = walk;
}
