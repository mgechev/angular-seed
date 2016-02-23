export interface IPostCall {
  setUrlParams(value:Object):IPostCall;
  setData(value:any):IPostCall;
  setFile(value:any):IPostCall;
  setUrlSubPath(value:string):IPostCall;

  send():Promise<any>;
}
