import 'reflect-metadata';

import { main } from '@angular/compiler-cli/src/main';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import * as util from 'gulp-util';
import { join } from 'path';
import { argv } from 'yargs';

import Config from '../../config';

const NgCompilerOptions = ['lang'];

const modifyFile = (path: string, mod: any = (f: string) => f) => {
  const file = readFileSync(path);
  writeFileSync(path, mod(file.toString()));
};

const updateCompilerOptions = (options: any, task: string) => {
  options.declaration = true;
  if (task.indexOf('rollup') >= 0) {
    options.module = 'es2015';
    options.moduleResolution = 'node';
  }
};

export = (done: any) => {
  // Note: dirty hack until we're able to set config easier
  modifyFile(join(Config.TMP_DIR, 'tsconfig.json'), (content: string) => {
    const parsed = JSON.parse(content);
    const path = join(Config.PROJECT_ROOT, Config.TOOLS_DIR, 'manual_typings', 'project');
    updateCompilerOptions(parsed.compilerOptions, argv._[0]);
    parsed.files = parsed.files || [];
    parsed.files = parsed.files.concat(
      readdirSync(path)
        .filter(f => f.endsWith('d.ts'))
        .map(f => join(path, f))
    );
    parsed.files = parsed.files.filter((f: string, i: number) => parsed.files.indexOf(f) === i);
    parsed.files.push(join(Config.BOOTSTRAP_DIR, 'main.ts'));
    return JSON.stringify(parsed, null, 2);
  });
  const args: string[] = [];
  const namedArgs = argv;

  args.push('-p', join(Config.TMP_DIR, 'tsconfig.json'));
  Object.keys(namedArgs)
    .filter(n => NgCompilerOptions.indexOf(n) >= 0)
    .forEach((key: string) => {
      if (key === 'lang') {
        const lang: string = namedArgs[key] as string;
        const i18nFilePath = `${Config.LOCALE_DEST}/messages.${lang}.xlf`;
        const isExists = existsSync(i18nFilePath);
        if (isExists) {
          args.push('--i18nFile', i18nFilePath);
          args.push('--locale', lang);
          args.push('--i18nFormat', 'xlf');
        } else {
          util.log(util.colors.gray('Translation file is not found'), util.colors.yellow(i18nFilePath));
          util.log(util.colors.gray(`Use 'npm run i18n' command to create your translation file`));
        }
      } else {
        args.push('--' + key, namedArgs[key]);
      }
    });

  return Promise.resolve(main(args)).catch((e: Error) => {
    console.error(e.stack);
    console.error('Compilation failed');
    process.exit(1);
  });
};
