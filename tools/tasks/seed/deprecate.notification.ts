import * as util from 'gulp-util';

export = (done: any) => {
  util.log(util.colors.yellow(`
    Warning!
    Please use ${util.colors.green('npm run build.prod')}
    Instead of ${util.colors.red('npm run build.prod.aot')} or ${util.colors.red('npm run build.prod.aot')}
    They will be deleted soon!`));

  done();
};
