declare module 'stylelint' {
  function stylelint(): NodeJS.ReadWriteStream;
  module stylelint {}
  export = stylelint;
}
