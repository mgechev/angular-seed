import {RequestOptionsArgs, RequestMethod, URLSearchParams, Headers} from "angular2/http";

export class CustomRequestOptionsArgs implements RequestOptionsArgs
{
  method:string|RequestMethod;
  search:string|URLSearchParams;
  headers:Headers;
  body:string;
  url:string;

  constructor()
  {
    this.headers = new Headers();
  }
}
