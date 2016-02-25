export interface IGlobalStore {
  actionOngoing:boolean;
  message:string;
}

export const initialGlobalStore:IGlobalStore = {
  actionOngoing: false,
  message: 'Ready'
};
