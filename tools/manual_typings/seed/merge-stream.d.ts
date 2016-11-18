declare module 'merge-stream' {
  function mergeStream(...streams: NodeJS.ReadWriteStream[]): MergeStream;
  interface MergeStream extends NodeJS.ReadWriteStream {
    add(stream: NodeJS.ReadWriteStream): MergeStream;
  }
  module mergeStream {}
  export = mergeStream;
}
