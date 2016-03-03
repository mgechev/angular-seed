import {AuthenticationStore} from '../../shared/features/authentication/authentication.store';
import {initialAuthenticationStore} from '../../shared/features/authentication/authentication.store';

export interface FeaturesStore {
  authentication:AuthenticationStore;
}
export const initialFeaturesStore:FeaturesStore = {
  authentication: initialAuthenticationStore
};
