import {MAIN_NAVIGATION_ITEM_CLICKED} from '../actions/navigation.actions';
import {Action} from '../actions/base.action';
import {initialActiveModuleStore} from '../stores/modules.store';

export function activeModuleReducer(state:string = initialActiveModuleStore, action:Action<any>):string {

  let newState:string;
  switch (action.type) {

    case MAIN_NAVIGATION_ITEM_CLICKED:

      newState = (action as Action<string>).payload;
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}
