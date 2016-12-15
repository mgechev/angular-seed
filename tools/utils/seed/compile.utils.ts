export const SYSTEMJS_CONFIG_START_SRC = `System.config({defaultJSExtensions: true,	map: {'dist/tmp/app':'.', 'dist/tmp':'.'}});`;

export const systemjsImportStart = (moduleName : string) => {
  return `System.import(\'${moduleName}\')
                .catch(function (e) {
                      console.error(e.stack || e,
                            'Not expecting this error? Report it at https://github.com/mgechev/angular-seed/issues\');});`;
};
