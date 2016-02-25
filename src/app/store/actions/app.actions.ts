import {Action} from './base.action';

export const APP_INITIALIZED:string = 'APP_INITIALIZED';

export function appInitialized():Action<any> {
  return {
    type: APP_INITIALIZED
  };
}
