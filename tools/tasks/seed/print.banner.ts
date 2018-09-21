import * as colors from 'ansi-colors';
import * as log from 'fancy-log';
import { readFile } from 'fs';
import { join } from 'path';

import Config from '../../config';

export = (done: any) => {
  let bannerPath = join(Config.TOOLS_DIR, 'config', 'banner.txt');
  const supportColor = require('supports-color');
  if (supportColor.has256 || supportColor.stdout.has256) {
    bannerPath = join(Config.TOOLS_DIR, 'config', 'banner-256.txt');
  }
  readFile(bannerPath, (e, content) => {
    if (!e) {
      log(colors.green(content.toString()));
    }
    done();
  });
};

