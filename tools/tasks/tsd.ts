export = function tsd(gulp, plugins) {
  return plugins.shell.task([
    'tsd reinstall --clean',
    'tsd link',
    'tsd rebundle'
  ]);
};
