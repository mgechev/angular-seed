import { argv } from 'yargs';
import * as CONFIG from '../../config';

/**
 * Returns the project configuration (consisting of the base configuration provided by seed.config.ts and the additional
 * project specific overrides as defined in project.config.ts)
 */
export function templateLocals() {
  const configEnvName = argv['config-env'] || 'dev';
  const configEnv = CONFIG.getPluginConfig('environment-config')[configEnvName];

  if (!configEnv) {
    throw new Error('Invalid configuration name');
  }

  const config = {
    ENV_CONFIG: JSON.stringify(configEnv)
  };

  return Object.assign(config, CONFIG);
}
