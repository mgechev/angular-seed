export interface IUiStateStore {
  initialized:boolean;
  actionOngoing:boolean;
  message:string;
}

export const initialUiStateStore:IUiStateStore = {
  initialized: false,
  actionOngoing: false,
  message: 'Ready'
};
