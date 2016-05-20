import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()
export class UserService {

    constructor( private authHttp: AuthHttp, private _spinnerService: SpinnerService) {
    }

    getUsers() {
        let url =  Config.GetURL('api/User/GetUsers');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getUserRole(id:number) {
        let url =  Config.GetURL('api/User/GetRoles');
        this._spinnerService.show();
        return this.authHttp.post(url, { userId: id })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    addUserRole(role:any) {
        let url =  Config.GetURL('api/User/AddRole');
        this._spinnerService.show();
        return this.authHttp.post(url, { role })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    revokeRole(role:any) {
        let url = Config.GetURL('api/User/RevokeRole');
        this._spinnerService.show();
        return this.authHttp.post(url, { role })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
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
