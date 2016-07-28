import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { GrdOptions } from  '../../../shared/model/index';
@Injectable()

export class RecruiterScheduleInterviewService {
    constructor(private http: Http,
        private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    //Get all interviews schedule by current logged in user (recruiter). 
    getMyInterviews(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetMyScheduledInterviews');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    //Get all interviews schedule. 
    getAllInterviews(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RecruitmentCycle/RecruiterGetScheduledInterviews');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
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