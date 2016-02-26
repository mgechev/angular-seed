export interface IGetCall {
  setUrlParams(value:Object):IGetCall;
  setUrlSubPath(value:string):IGetCall;

  send():Promise<any>;
}
