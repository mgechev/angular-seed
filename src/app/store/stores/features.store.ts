import {AuthenticationStore, initialAuthenticationStore} from '../../shared/features/authentication/authentication.store';
import {BackendStore, initialBackendStore} from '../../shared/features/backend/backend.store';

export interface FeaturesStore {
  authentication:AuthenticationStore;
  backend:BackendStore;
}
export const initialFeaturesStore:FeaturesStore = {
  authentication: initialAuthenticationStore,
  backend: initialBackendStore
};
