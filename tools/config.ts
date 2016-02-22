import {SEED_CONFIG, ISeedConfig} from './config/seed.config';
import {PROJECT_CONFIG, IProjectConfig} from './config/project.config';

// Maintain compatibility.
export * from './config/seed/config';

export interface IConfig extends ISeedConfig, IProjectConfig {}

export const CONFIG: IConfig = Object.assign(SEED_CONFIG, PROJECT_CONFIG);
