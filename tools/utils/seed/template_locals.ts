import * as util from 'gulp-util';
import { argv } from 'yargs';
import { join } from 'path';

import Config from '../../config';

/**
 * Builds an object consisting of the base configuration provided by confg/seed.config.ts, the additional
 * project specific overrides as defined in config/project.config.ts and including the base environment config as defined in env/base.ts
 * and the environment specific overrides (for instance if env=dev then as defined in env/dev.ts).
 */
export class TemplateLocalsBuilder {
  private stringifySystemConfigDev = false;
  private stringifyEnvConfig = true;

  withStringifiedSystemConfigDev() {
    this.stringifySystemConfigDev = true;
    return this;
  }
  withoutStringifiedEnvConfig() {
    this.stringifyEnvConfig = false;
    return this;
  }


  build() {
    const configEnvName = argv['env-config'] || argv['config-env'] || 'dev';
    const configPath = Config.getPluginConfig('environment-config');
    const envOnlyConfig = this.getConfig(configPath, configEnvName);
    const baseConfig = this.getConfig(configPath, 'base');
    const packageJSON = require('../../../package.json');
    const versionJSON = { VERSION : packageJSON.version };

    if (!envOnlyConfig) {
      throw new Error(configEnvName + ' is an invalid configuration name');
    }

    const envConfig = Object.assign({}, baseConfig, envOnlyConfig, versionJSON);
    let locals = Object.assign({},
      Config,
      { ENV_CONFIG: this.stringifyEnvConfig ? JSON.stringify(envConfig) : envConfig }
    );
    if (this.stringifySystemConfigDev) {
      Object.assign(locals, {SYSTEM_CONFIG_DEV: JSON.stringify(Config.SYSTEM_CONFIG_DEV)});
    }
    return locals;
  }

  private getConfig(path: string, env: string) {
    const configPath = join(path, env);
    let config: any;
    try {
      config = JSON.parse(JSON.stringify(require(configPath)));
    } catch (e) {
      config = null;
      util.log(util.colors.red(e.message));
    }

    return config;
  }
}
