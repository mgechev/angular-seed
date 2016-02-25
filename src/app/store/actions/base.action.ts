export interface Action<P> {
  type:string;
  payload?:P;
  error?:boolean;
  meta?:any;
}
