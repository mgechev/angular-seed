export const SERVICE_ACTION_STARTED = 'BACKEND_ACTION_STARTED';
export const SERVICE_ACTION_FINISHED = 'BACKEND_ACTION_FINISHED';

export function backendActionStarted(message:string) {
  return {
    type: SERVICE_ACTION_STARTED,
    message
  };
}

export function backendActionFinished(message:string = '') {
  return {
    type: SERVICE_ACTION_FINISHED
  };
}
