import {Action} from './base.action';

export const OLD_SERVICE_ACTION_STARTED = 'OLD_SERVICE_ACTION_STARTED';
export const OLD_SERVICE_ACTION_FINISHED = 'OLD_SERVICE_ACTION_FINISHED';

export interface IOldServiceActionPayload {
  endpoint:string;
  message:string;
  result?:any;
}

/**
 * @deprecated should use new implementation now
 */
export function oldBackendActionStarted(endpoint:string = ''):Action<IOldServiceActionPayload> {
  return {
    type: OLD_SERVICE_ACTION_STARTED,
    payload: {
      endpoint: endpoint,
      message: 'Backend action started'
    }
  };
}

/**
 * @deprecated should use new implementation now
 */
export function oldBackendActionFinished(endpoint:string = '', result):Action<IOldServiceActionPayload> {
  return {
    type: OLD_SERVICE_ACTION_FINISHED,
    payload: {
      endpoint: endpoint,
      message: 'Backend action started',
      result: result
    }
  };
}

// new implementation below
export const BACKEND_CALL_STARTED:string = 'BACKEND_CALL_STARTED';
export const BACKEND_CALL_SUCCEEDED:string = 'BACKEND_CALL_SUCCEEDED';
export const BACKEND_CALL_FAILED:string = 'BACKEND_CALL_FAILED';

export interface BackendCallStartedActionPayload {
  methodIdent:string;
  parameters?:Object;
  options?:Object;
}
export interface BackendCallSucceededActionPayload<R> {
  methodIdent:string;
  result?:R;
}
export interface BackendCallFailedActionPayload {
  methodIdent:string;
  error:Object;
}

export function backendCallStarted(methodIdent:string, parameters:Object, options:Object):Action<BackendCallStartedActionPayload> {
  return {
    type: BACKEND_CALL_STARTED,
    payload: {
      methodIdent,
      parameters,
      options
    }
  };
}
export function backendCallSucceeded(methodIdent:string, result:any):Action<BackendCallSucceededActionPayload<any>> {
  return {
    type: BACKEND_CALL_SUCCEEDED,
    payload: {
      methodIdent,
      result
    }
  };
}
export function backendCallFailed(methodIdent:string, error:Object):Action<BackendCallFailedActionPayload> {
  return {
    type: BACKEND_CALL_FAILED,
    payload: {
      methodIdent,
      error
    }
  };
}
