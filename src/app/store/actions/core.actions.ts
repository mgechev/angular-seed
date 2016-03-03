import {Action} from './base.action';

export class CoreActions {
  public static ANY_ACTION_DONE:string = 'CoreActions.ANY_ACTION_DONE';

  public static anyActionDone():Action<any> {
    return {
      type: CoreActions.ANY_ACTION_DONE
    };
  }
}
