import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { PracticeInfo } from '../models/practiceInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';

@Injectable()
export class PracticeService {

    constructor(private http: Http, private authHttp: AuthHttp) { }

    addPractice(practice: PracticeInfo) {
        let url = Config.GetURL('api/Masters/Practice/Add');
        return this.authHttp.post(url, { practice })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getPractices() {
        let url = Config.GetURL('api/Masters/GetPractices');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

     getPracticeById(id: number) {
        let url = Config.GetURL('api/Masters/Practice/GetPracticeById');
        return this.authHttp.post(url,{ practice:{id:id} })
            .map(this.extractData)
            .catch(this.handleError);
    }

    deletePractice(practice: PracticeInfo) {
        let url = Config.GetURL('api/Masters/Practice/Delete');
        return this.authHttp.post(url, { practice })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editPractice(practice: PracticeInfo) {
        let url = Config.GetURL('api/Masters/Practice/Edit');
        return this.authHttp.post(url, { practice })
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
