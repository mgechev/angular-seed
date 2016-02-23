import {IBaseAction} from './base.action';
import {ITypedAction} from './typed.action';

export const APP_INITIALIZED:string = 'APP_INITIALIZED';
export interface IAppInitializedAction<P> extends ITypedAction<string,P> {
}

export const BACKEND_CALL_FAILS:string = 'BACKEND_CALL_FAILS';
export interface IBackendCallFailsAction extends IBaseAction<string> {
  error:Object;
}

export function appInitialized():ITypedAction<string,Object> {
  return {
    type: APP_INITIALIZED,
    payload: null
  };
}
export function backendCallFails(error:Object):IBackendCallFailsAction {
  return {
    type: BACKEND_CALL_FAILS,
    error
  };
}
