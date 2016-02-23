import {MAIN_NAVIGATION_ITEM_CLICKED} from '../actions/navigation.actions';
import {IBaseAction} from '../actions/base.action';
import {IMainNavigationItemClickedAction} from '../actions/navigation.actions';

export function activeModuleReducer(state:string, action:IBaseAction):string {

  let newState:string;
  switch (action.type) {

    case MAIN_NAVIGATION_ITEM_CLICKED:

      console.log('action:');
      console.log(action);

      newState = (action as IMainNavigationItemClickedAction).key;
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}
