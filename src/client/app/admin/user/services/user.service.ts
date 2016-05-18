import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserInfo } from '../models/userInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';

@Injectable()
export class UserService {

    constructor( private authHttp: AuthHttp) {
    }

    getUsers() {
        let url =  Config.GetURL('api/User/GetUsers');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUserRole(id:number) {
        let url =  Config.GetURL('api/User/GetRoles');
        return this.authHttp.post(url, { userId: id })
            .map(this.extractData)
            .catch(this.handleError);
    }

    addUserRole(role:any) {
        let url =  Config.GetURL('api/User/AddRole');
        return this.authHttp.post(url, { role })
            .map(this.extractData)
            .catch(this.handleError);
    }

    revokeRole(role:any) {
        let url = Config.GetURL('api/User/RevokeRole');
        return this.authHttp.post(url, { role })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}