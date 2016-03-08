declare module 'isstream' {
  function istream(stream: any): boolean;
  interface Istream {
    isReadable(stream: any): boolean;
    isWritable(stream: any): boolean;
    isDuplex(stream: any): boolean;
  }
  module istream {}
  export = istream;
}
