export interface IGetCall {
  setRestPath(restPath:string):IGetCall;

  setUrlParams(value:Object):IGetCall;
  setUrlSubPath(value:string):IGetCall;

  send():Promise<any>;
}
