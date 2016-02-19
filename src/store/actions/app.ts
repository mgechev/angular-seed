export const APP_INITIALIZED:string = 'APP_INITIALIZED';
export const BACKEND_CALL_FAILS:string = 'BACKEND_CALL_FAILS';

export function appInitialized() {
  return {
    type: APP_INITIALIZED
  };
}
export function backendCallFails(error:Object) {
  return {
    type: BACKEND_CALL_FAILS,
    error
  };
}
