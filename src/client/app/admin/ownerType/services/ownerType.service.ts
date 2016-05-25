import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { OwnerTypeInfo } from '../models/ownerTypeInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()
export class OwnerTypeService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    addOwnerType(ownerType: OwnerTypeInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/OwnerType/Add');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { ownerType })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getOwnerTypes() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetOwnerTypes');
        this._spinnerService.show();
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getOwnerTypeById(id: number) {
        let authenticateUrl = Config.GetURL('/api/Masters/OwnerType/GetOwnerTypeById');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { ownerType: { Id: id } })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    deleteOwnerType(ownerType: OwnerTypeInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/OwnerType/Delete');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { ownerType })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editOwnerType(ownerType: OwnerTypeInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/OwnerType/Edit');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { ownerType })
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
