import {Action} from './base.action';

export const APP_INITIALIZED:string = 'APP_INITIALIZED';

export const BACKEND_CALL_FAILS:string = 'BACKEND_CALL_FAILS';

export function appInitialized():Action<any> {
  return {
    type: APP_INITIALIZED
  };
}
export function backendCallFails(error:Object):Action<Object> {
  return {
    type: BACKEND_CALL_FAILS,
    payload: error,
    error: true
  };
}
