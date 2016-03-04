import {Action} from './../../../store/actions/base.action';

export const BACKEND_URL_SELECTED:string = 'BACKEND_URL_SELECTED';

export function backendUrlSelected(backendUrl:string):Action<string> {
  return {
    type: BACKEND_URL_SELECTED,
    payload: backendUrl
  };
}
