import {MAIN_NAVIGATION_ITEM_CLICKED} from '../actions/navigation.actions';
import {Action} from '../actions/base.action';
import {IMainNavigationItemClickedAction} from '../actions/navigation.actions';
import {initialActiveModuleStore} from '../stores/modules.store';

export function activeModuleReducer(state:string = initialActiveModuleStore, action:Action):string {

  let newState:string;
  switch (action.type) {

    case MAIN_NAVIGATION_ITEM_CLICKED:

      newState = (action as IMainNavigationItemClickedAction).key;
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}
