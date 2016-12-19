import { ProjectConfig } from '../../config/project.config';

export const systemjsConfigStart = (project : ProjectConfig) => {

  const packages = JSON.stringify(project.SYSTEM_BUILDER_CONFIG.packages);

  return  `System.config({
             defaultJSExtensions: true,
    	       map: {
                'dist/tmp/${project.BOOTSTRAP_DIR}':'.',
                'dist/tmp':'.'
             },
             packages:
                ${packages}
           });`
         ;
};

export const systemjsImportStart = (moduleName: string) => {
  return `System.import(\'${moduleName}\')
                .catch(function (e) {
                      console.error(e.stack || e,
                            'Not expecting this error? Report it at https://github.com/mgechev/angular-seed/issues\');});`;
};


export const TRACEUR_RUNTIME_SRC = `$traceurRuntime = {
                             typeof: function (a) {
                               return typeof a;
                             }
                           }; `
;
