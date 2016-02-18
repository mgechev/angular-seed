export const SERVICE_ACTION_STARTED = 'BACKEND_ACTION_STARTED';
export const SERVICE_ACTION_FINISHED = 'BACKEND_ACTION_FINISHED';

export function backendActionStarted(endpoint: string = '') {
  return {
    type: SERVICE_ACTION_STARTED,
    endpoint
  };
}

export function backendActionFinished(endpoint: string = '', result) {
  return {
    type: SERVICE_ACTION_FINISHED,
    endpoint,
    result
  };
}
