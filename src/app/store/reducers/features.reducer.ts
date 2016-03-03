import {Action} from '../actions/base.action';
import {authenticationReducer} from '../../shared/features/authentication/authentication.reducer';
import {FeaturesStore} from '../stores/features.store';
import {initialFeaturesStore} from '../stores/features.store';

export function featuresReducer(store:FeaturesStore, action:Action<any>):any {
  if (!store) {
    return initialFeaturesStore;
  }

  let newStore:FeaturesStore = store;

  // loop through registered features and call its reducers with the regarding store area
  // state['feature-a'] = featureAReducer(state['feature-a'], action);
  // for now, check it statically
  newStore.authentication = authenticationReducer(store.authentication, action);

  return newStore;
}
