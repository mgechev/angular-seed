import {Action} from './../../../store/actions/base.action';

export class BackendActions
{
  public static BACKEND_URL_SELECTED:string = 'BACKEND_URL_SELECTED';
  public static BACKEND_URL_COMMITED:string = 'BACKEND_URL_COMMITED';
  public static BACKEND_URL_DISCARDED:string = 'BACKEND_URL_DISCARDED';

  public static backendUrlSelected(backendUrl:string):Action<string>
  {
    return {
      type: BackendActions.BACKEND_URL_SELECTED,
      payload: backendUrl
    };
  }

  public static backendUrlCommited():Action<string>
  {
    return {
      type: BackendActions.BACKEND_URL_COMMITED
    };
  }

  public static backendUrlDiscarded():Action<string>
  {
    return {
      type: BackendActions.BACKEND_URL_DISCARDED
    };
  }
}
