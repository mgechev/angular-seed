declare module 'angular2-hot-loader' {
  export interface Options {
      port?: number;
      path?: string;
      processPath?: Function;
  }
  export function listen(localConfig?: Options): void;
  export function onChange(files: string[]): void;
}
