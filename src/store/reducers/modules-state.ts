import {MAIN_NAVIGATION_ITEM_CLICKED} from '../actions/navigation';

const initialActiveModule = 'startpage';

function activeModule(state, action) {
  if (!state) {
    return initialActiveModule;
  }

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

export {initialActiveModule};
export {activeModule};
