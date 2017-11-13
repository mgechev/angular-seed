import Config from '../../config';
import { readFile } from 'fs';
import * as util from 'gulp-util';
import { join } from 'path';

export = (done: any) => {
  let bannerPath = join(Config.TOOLS_DIR, 'config', 'banner.txt');
  const colors = require('supports-color');
  if (colors.has256 || colors.stdout.has256) {
    bannerPath = join(Config.TOOLS_DIR, 'config', 'banner-256.txt');
  }
  readFile(bannerPath, (e, content) => {
    if (!e) {
      console.log(util.colors.green(content.toString()));
    }
    done();
  });
};

