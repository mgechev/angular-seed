import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { OwnerTypeInfo } from '../models/ownerTypeInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';

@Injectable()
export class OwnerTypeService {

    constructor(private http: Http, private authHttp: AuthHttp) { }

    addOwnerType(ownerType: OwnerTypeInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/OwnerType/Add');
        return this.authHttp.post(authenticateUrl, { ownerType })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getOwnerTypes() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetOwnerTypes');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getOwnerTypeById(id: string) {
        let authenticateUrl = Config.GetURL('/api/Masters/OwnerType/GetOwnerTypeById');
        return this.authHttp.post(authenticateUrl, { ownerType: { id: id } })
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteOwnerType(ownerType: OwnerTypeInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/OwnerType/Delete');
        return this.authHttp.post(authenticateUrl, { ownerType })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editOwnerType(ownerType: OwnerTypeInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/OwnerType/Edit');
        return this.authHttp.post(authenticateUrl, { ownerType })
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
