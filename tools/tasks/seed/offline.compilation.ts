// Inspired by https://github.com/angular/angular/blob/master/modules/%40angular/compiler_cli/src/main.ts
import 'reflect-metadata';

import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import {tsc, check} from '@angular/compiler-cli/tsc';
import {MetadataWriterHost, TsickleHost, NodeReflectorHost, CodeGenerator} from '@angular/compiler-cli';

import {APP_SRC, TMP_DIR} from '../../config';


export = (done: () => void) => {
  main(APP_SRC)
    .then(() => done())
    .catch(e => {
      console.error(e.stack);
      console.error("Compilation failed");
      // process.exit(1);
    });
}


function main(project: string, basePath?: string): Promise<any> {
  try {
    let projectDir = project;
    if (fs.lstatSync(project).isFile()) {
      projectDir = path.dirname(project);
    }
    // file names in tsconfig are resolved relative to this absolute path
    basePath = path.join(process.cwd(), basePath || projectDir);

    // read the configuration options from wherever you store them
    const config = tsc.readConfiguration(project, basePath);

    // Skip generation of .js and .js.map (we don't need them).
    config.parsed.options['noEmit'] = true;
    config.parsed.fileNames = config.parsed.fileNames.filter((f: string) => !/main.ts|.ngfactory.ts|.css.shim.ts/.test(f));

    console.log(config);


    const {parsed, ngOptions} = config;
    ngOptions.basePath = basePath;

    const host = ts.createCompilerHost(parsed.options, true);

    let codegenStep: Promise<any>;

    const program = ts.createProgram(parsed.fileNames, parsed.options, host);
    const errors = program.getOptionsDiagnostics();
    check(errors);

    const doCodegen = ngOptions.skipTemplateCodegen ?
                          Promise.resolve(null) :
                          CodeGenerator.create(ngOptions, program, parsed.options, host).codegen();

    return doCodegen.then(() => {
      tsc.typeCheck(host, program);

      // Emit *.js with Decorators lowered to Annotations, and also *.js.map
      const tsicklePreProcessor = new TsickleHost(host, parsed.options);
      tsc.emit(tsicklePreProcessor, program);

      if (!ngOptions.skipMetadataEmit) {
        // Emit *.metadata.json and *.d.ts
        // Not in the same emit pass with above, because tsickle erases
        // decorators which we want to read or document.
        // Do this emit second since TypeScript will create missing directories for us
        // in the standard emit.
        const metadataWriter = new MetadataWriterHost(host, program, parsed.options, ngOptions);
        tsc.emit(metadataWriter, program);
      }
    });
  } catch (e) {
    return Promise.reject(e);
  }
}
