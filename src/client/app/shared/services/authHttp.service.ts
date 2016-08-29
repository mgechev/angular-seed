import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class AuthHttp {
    http:Http;
    constructor(http: Http) {
        this.http = http;
    }

    createAuthorizationHeader(headers: Headers) {
        if (localStorage.getItem('access_token') !== null) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        }
    }

    addServerType(headers: Headers) {
        headers.append('server_type', '');
    }

    addContentType(headers: Headers) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept','application/json');
    }

    get(url:string) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        this.addServerType(headers);
        this.addContentType(headers);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options);
    }

    post(url:string, data:any) {
        let body = JSON.stringify(data);
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        this.addContentType(headers);
        this.addServerType(headers);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options);
    }
}
