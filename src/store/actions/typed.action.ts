import {IBaseAction} from './base.action';

export interface ITypedAction<T,P> extends IBaseAction {
  type:T;
  payload:P;
}
