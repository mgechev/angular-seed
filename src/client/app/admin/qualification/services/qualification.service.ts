import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { QualificationInfo } from '../models/qualificationInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()
export class QualificationService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    addQualification(qualification: QualificationInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/Qualification/Add');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { qualification })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getQualifications() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetQualifications');
        this._spinnerService.show();
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getQualificationById(id: number) {
        let authenticateUrl = Config.GetURL('/api/Masters/Qualification/GetQualificationById');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { qualification: { Id: id } })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    deleteQualification(qualification: QualificationInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/Qualification/Delete');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { qualification })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editQualification(qualification: QualificationInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/Qualification/Edit');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { qualification })
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
