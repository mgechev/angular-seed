import {IBaseAction} from './base.action';

export const APP_INITIALIZED:string = 'APP_INITIALIZED';
export interface IAppInitializedAction extends IBaseAction {
}

export const BACKEND_CALL_FAILS:string = 'BACKEND_CALL_FAILS';
export interface IBackendCallFailsAction extends IBaseAction {
  error:Object;
}

export function appInitialized():IAppInitializedAction {
  return {
    type: APP_INITIALIZED
  };
}
export function backendCallFails(error:Object):IBackendCallFailsAction {
  return {
    type: BACKEND_CALL_FAILS,
    error
  };
}
