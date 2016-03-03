import {IAppStore,initialAppStore} from './ui/app.store';
import {IGlobalStore,initialGlobalStore} from './ui/global.store';

export interface IUiStore {
  global:IGlobalStore;
  app:IAppStore;
}

export const initialUiStore:IUiStore = {
  global: initialGlobalStore,
  app: initialAppStore
};
