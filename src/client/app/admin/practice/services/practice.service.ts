import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { PracticeInfo } from '../models/practiceInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()
export class PracticeService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    addPractice(practice: PracticeInfo) {
        let url = Config.GetURL('api/Masters/Practice/Add');
        return this.authHttp.post(url, { practice })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getPractices() {
        let url = Config.GetURL('api/Masters/GetPractices');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

     getPracticeById(id: number) {
        let url = Config.GetURL('api/Masters/Practice/GetPracticeById');
        this._spinnerService.show();
        return this.authHttp.post(url,{ practice:{id:id} })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    deletePractice(practice: PracticeInfo) {
        let url = Config.GetURL('api/Masters/Practice/Delete');
        this._spinnerService.show();
        return this.authHttp.post(url, { practice })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editPractice(practice: PracticeInfo) {
        let url = Config.GetURL('api/Masters/Practice/Edit');
        this._spinnerService.show();
        return this.authHttp.post(url, { practice })
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
