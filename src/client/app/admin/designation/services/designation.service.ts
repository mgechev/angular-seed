import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DesignationInfo } from '../models/designationInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()
export class DesignationService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    addDesignation(designation: DesignationInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/Designation/Add');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { designation })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getDesignations() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetDesignations');
        this._spinnerService.show();
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

     getDesignationById(id:string) {
        let authenticateUrl = Config.GetURL('/api/Masters/Designation/GetDesignationById');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl,{ designation:{id:id} })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    deleteDesignation(designation: DesignationInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/Designation/Delete');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { designation })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editDesignation(designation: DesignationInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/Designation/Edit');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { designation })
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
