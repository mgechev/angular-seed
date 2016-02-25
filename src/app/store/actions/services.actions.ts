import {Action} from './base.action';

export const SERVICE_ACTION_STARTED = 'BACKEND_ACTION_STARTED';
export const SERVICE_ACTION_FINISHED = 'BACKEND_ACTION_FINISHED';

export interface IServiceActionPayload {
  endpoint:string;
  message:string;
  result?:any;
}

export function backendActionStarted(endpoint:string = ''):Action<IServiceActionPayload> {
  return {
    type: SERVICE_ACTION_STARTED,
    payload: {
      endpoint: endpoint,
      message: 'Backend action started'
    }
  };
}

export function backendActionFinished(endpoint:string = '', result):Action<IServiceActionPayload> {
  return {
    type: SERVICE_ACTION_FINISHED,
    payload: {
      endpoint: endpoint,
      message: 'Backend action started',
      result: result
    }
  };
}
