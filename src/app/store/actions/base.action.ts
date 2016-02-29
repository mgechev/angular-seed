export interface Action<P> {
  type:string;
  payload?:P;
  error?:boolean;
  meta?:any;
}

export function getActionPayload<P>(action:Action<any>):P {
  return (action as Action<P>).payload;
}
