import {MAIN_NAVIGATION_ITEM_CLICKED} from '../actions/navigation';
import {initialActiveModuleStore} from '../stores/modules.store';

export function activeModule(state = initialActiveModuleStore, action) {

  let newState;
  switch (action.type) {

    case MAIN_NAVIGATION_ITEM_CLICKED:

      console.log('action:');
      console.log(action);

      newState = action.key;
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}
