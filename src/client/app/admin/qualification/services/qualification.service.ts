import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { QualificationInfo } from '../models/qualificationInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';

@Injectable()
export class QualificationService {

    constructor(private http: Http, private authHttp: AuthHttp) { }

    addQualification(qualification: QualificationInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/Qualification/Add');
        return this.authHttp.post(authenticateUrl, { qualification })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getQualifications() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetQualifications');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getQualificationById(id: string) {
        let authenticateUrl = Config.GetURL('/api/Masters/Qualification/GetQualificationById');
        return this.authHttp.post(authenticateUrl, { qualification: { id: id } })
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteQualification(qualification: QualificationInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/Qualification/Delete');
        return this.authHttp.post(authenticateUrl, { qualification })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editQualification(qualification: QualificationInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/Qualification/Edit');
        return this.authHttp.post(authenticateUrl, { qualification })
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