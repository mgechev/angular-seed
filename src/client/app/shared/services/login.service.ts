import { Injectable, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {AuthInfo} from '../../login/models/AuthInfo';
import { AuthHttp } from '../../shared/services/authHttp.service';
import { Config } from '../../shared/config/config';
import {CommonService} from '../../shared/services/common.service';


@Injectable()
export class LoginService {
    onAuthStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private authHttp: AuthHttp,
        private commonService: CommonService) { }

    authenticate(credentials: AuthInfo) {
        let authenticateUrl = Config.GetURL('/api/Authentication/GetToken');
        return this.authHttp.post(authenticateUrl, credentials)
            .map((res: Response) => { this.setToken(res); this.emitAuthEvent(true); })
            .catch(this.handleError);
    }

    getLoggedInUserPermission() {
        let url = Config.GetURL('/api/user/GetLoggedInUserPermission');
        return this.authHttp.get(url)
            .map((res: Response) => {
                this.commonService.setLoggedInUserPermission(res.json());
                this.extractData(res);
            })
            .catch(this.handleError);
    }

    getAuthEmitter() {
        return this.onAuthStatusChange;
    }

    logout() {
        localStorage.clear();
        this.emitAuthEvent(false);
    }

    emitAuthEvent(value: boolean) {
        this.onAuthStatusChange.emit(value);
    }

    isAuthenticated() {
        if (localStorage.getItem('access_token')) {
            return true;
        } else {
            return false;
        }
    }

    extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private setToken(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('access_token', body.token);
        return body || {};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
