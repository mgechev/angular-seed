import {Action} from './base.action';

export const APP_INITIALIZED:string = 'APP_INITIALIZED';
export const COMPONENT_INITIALIZED:string = 'COMPONENT_INITIALIZED';

export function appInitialized():Action<any> {
  return {
    type: APP_INITIALIZED
  };
}

export function componentInitialized(componentId:string):Action<any> {
  return {
    type: COMPONENT_INITIALIZED,
    payload: componentId
  };
}
