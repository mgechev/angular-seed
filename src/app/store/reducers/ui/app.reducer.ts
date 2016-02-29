import {IAppStore} from '../../stores/ui/app.store';
import {Action} from '../../actions/base.action';
import {initialAppStore} from '../../stores/ui/app.store';
import {APP_INITIALIZED} from '../../actions/app.actions';
import {MAIN_NAVIGATION_ITEM_CLICKED} from '../../actions/navigation.actions';
import {SECONDARY_NAVIGATION_ITEM_CLICKED} from '../../actions/navigation.actions';

export function appReducer(state:IAppStore = initialAppStore, action:Action<any>):IAppStore {
  let newState:IAppStore;

  switch (action.type) {
    case APP_INITIALIZED:
      newState = {
        initialized: true,
        info: state.info,
        activeMainNavigationItem: state.activeMainNavigationItem,
        mainNavigation: state.mainNavigation,
        dialogs: state.dialogs
      };
      break;

    case MAIN_NAVIGATION_ITEM_CLICKED:
      if(action) {
        newState = {
          initialized: state.initialized,
          info: state.info,
          activeMainNavigationItem: action.payload,
          mainNavigation: state.mainNavigation,
          dialogs: state.dialogs
        };
      }
      break;

    case SECONDARY_NAVIGATION_ITEM_CLICKED:
      if(action) {
        newState = {
          initialized: state.initialized,
          info: state.info,
          activeMainNavigationItem: state.activeMainNavigationItem,
          mainNavigation: state.mainNavigation,
          dialogs: state.dialogs
        };
      }
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}
