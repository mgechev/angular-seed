import {IAppStore} from '../../stores/ui/app.store';
import {Action} from '../../actions/base.action';
import {initialAppStore} from '../../stores/ui/app.store';
import {APP_INITIALIZED} from '../../actions/app.actions';

export function appReducer(state:IAppStore = initialAppStore, action:Action):IAppStore {
  let newState:IAppStore;

  switch (action.type) {
    case APP_INITIALIZED:
      newState = {
        initialized: true
      };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}
