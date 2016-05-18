import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DesignationInfo } from '../models/designationInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';

@Injectable()
export class DesignationService {

    constructor(private http: Http, private authHttp: AuthHttp) { }

    addDesignation(designation: DesignationInfo) {     
        let authenticateUrl = Config.GetURL('/api/Master/Designation/Add');
        return this.authHttp.post(authenticateUrl, { designation })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getDesignations() {     
        let authenticateUrl = Config.GetURL('/api/Masters/GetDesignations');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

     getDesignationById(id:string) {       
        let authenticateUrl = Config.GetURL('/api/Masters/Designation/GetDesignationById');
        return this.authHttp.post(authenticateUrl,{ designation:{id:id} })
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteDesignation(designation: DesignationInfo) {      
        let authenticateUrl = Config.GetURL('/api/Master/Designation/Delete');
        return this.authHttp.post(authenticateUrl, { designation })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editDesignation(designation: DesignationInfo) {    
        let authenticateUrl = Config.GetURL('/api/Master/Designation/Edit');
        return this.authHttp.post(authenticateUrl, { designation })
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