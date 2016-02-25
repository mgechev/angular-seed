import {MAIN_NAVIGATION_ITEM_CLICKED} from '../actions/navigation.actions';
import {IBaseAction} from '../actions/base.action';
import {IMainNavigationItemClickedAction} from '../actions/navigation.actions';
import {initialActiveModuleStore} from '../stores/modules.store';

export function activeModuleReducer(state:string = initialActiveModuleStore, action:IBaseAction):string {

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
