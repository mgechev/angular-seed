import {APP_BASE, VERSION} from '../config';

// TODO: Add an interface to register more template locals.
export function templateLocals() {
  return {
    VERSION,
    APP_BASE
  };
}
