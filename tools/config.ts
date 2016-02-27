import {SEED_CONFIG, ISeedConfig} from './config/seed.config';
import {PROJECT_CONFIG, IProjectConfig} from './config/project.config';

interface IConfig extends ISeedConfig, IProjectConfig {}

const CONFIG: IConfig = Object.assign({}, SEED_CONFIG, PROJECT_CONFIG);

export = CONFIG;
