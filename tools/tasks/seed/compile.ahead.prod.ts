import 'reflect-metadata';
import * as ts from 'typescript';
import { argv } from 'yargs';
import { join } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { CodeGenerator, AngularCompilerOptions, NgcCliOptions, main } from '@angular/compiler-cli';

import Config from '../../config';

const normalizeConfig = (bundles: any[]) => {
  return bundles.map(b => {
    if (typeof b === 'string') {
      b = { path: b };
    }
    if (!b.module) {
      b.module = b.path.split('\/').pop() + '.module.ts';
    } else {
      b.module += '.ts';
    }
    return b;
  });
};

function codegen(
  ngOptions: AngularCompilerOptions, cliOptions: NgcCliOptions, program: ts.Program,
  host: ts.CompilerHost) {
  return CodeGenerator.create(ngOptions, cliOptions, program, host).codegen();
}

const modifyFile = (path: string, mod: any = (f: string) => f) => {
  const file = readFileSync(path);
  writeFileSync(path, mod(file.toString()));
};

export = (done: any) => {
  // Note: dirty hack until we're able to set config easier
  const config = normalizeConfig(JSON.parse(JSON.stringify(Config.BUNDLES)));
  modifyFile(join(Config.TMP_DIR, 'tsconfig.json'), (content: string) => {
    const parsed = JSON.parse(content);
    parsed.files = parsed.files || [];
    parsed.files.push(join(Config.BOOTSTRAP_DIR, 'main.ts'));
    config.forEach((f: any) => parsed.files.push(join(Config.BOOTSTRAP_DIR, f.path, f.module)));
    return JSON.stringify(parsed, null, 2);
  });
  const args = argv;

  // If a translation, tell the compiler
  if (args.lang) {
    args['i18nFile'] = `./src/client/assets/locale/messages.${args.lang}.xlf`;
    args['locale'] = args.lang;
    args['i18nFormat'] = 'xlf';
  }

  const cliOptions = new NgcCliOptions(args);
  main(Config.TMP_DIR, cliOptions, codegen)
    .then(done)
    .catch(e => {
      console.error(e.stack);
      console.error('Compilation failed');
      process.exit(1);
    });
};
