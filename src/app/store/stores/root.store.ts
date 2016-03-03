import {IAssignmentsStore, initialAssignmentsStore} from './assignments.store';
import {IUsersStore,initialUsersStore} from './users.store';
import {IDataStore,initialDataStore} from './data.store';
import {IUiStore,initialUiStore} from './ui.store';
import {initialActiveModuleStore} from './modules.store';
import {initialCoreStore} from './core.store';
import {CoreStore} from './core.store';
import {FeaturesStore} from './features.store';
import {initialFeaturesStore} from './features.store';

export interface IRootStore {
  core:CoreStore;
  features:FeaturesStore;
  data:IDataStore;
  activeModule:string;
  ui:IUiStore;
  usersState:IUsersStore;
  assignmentsState:IAssignmentsStore;
}

export const initialRootStore:IRootStore = {
  core: initialCoreStore,
  features: initialFeaturesStore,
  data: initialDataStore,
  activeModule: initialActiveModuleStore,
  ui: initialUiStore,
  usersState: initialUsersStore,
  assignmentsState: initialAssignmentsStore
};
