import {Action} from './base.action';

export const SERVICE_ACTION_STARTED = 'BACKEND_ACTION_STARTED';
export interface IServiceActionStartedAction extends Action {
  endpoint:string;
  message:string;
}
export const SERVICE_ACTION_FINISHED = 'BACKEND_ACTION_FINISHED';
export interface IServiceActionFinishedAction extends Action {
  endpoint:string;
  result:any;
  message:string;
}

export function backendActionStarted(endpoint:string = ''):IServiceActionStartedAction {
  return {
    type: SERVICE_ACTION_STARTED,
    endpoint,
    message: 'Backend action started'
  };
}

export function backendActionFinished(endpoint:string = '', result):IServiceActionFinishedAction {
  return {
    type: SERVICE_ACTION_FINISHED,
    endpoint,
    result,
    message: 'Ready'
  };
}
