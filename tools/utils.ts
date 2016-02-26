import * as SEED_UTILS from './utils/seed.utils';
import * as PROJECT_UTILS from './utils/project.utils';

// Maintain compatibility.
export * from './utils/seed.utils';

// Interface issue to solve.
export const UTILS = Object.assign({}, SEED_UTILS, PROJECT_UTILS);
