import * as colors from 'ansi-colors';
import * as log from 'fancy-log';

export = (done: any) => {
  log(colors.yellow(`
    Warning!
    Please use ${colors.green('npm run build.prod')}
    Instead of ${colors.red('npm run build.prod.aot')} or ${colors.red('npm run build.prod.aot')}
    They will be deleted soon!`));

  done();
};
