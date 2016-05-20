import * as CONFIG from '../../config';

/**
 * Returns the project configuration (consisting of the base configuration provided by see.config.ts and the additional
 * project specific overrides as defined in project.config.ts)
 */
export function templateLocals() {
  return CONFIG;
}
