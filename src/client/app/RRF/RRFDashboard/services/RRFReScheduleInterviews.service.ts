import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { GrdOptions } from  '../../../shared/model/index';
import { CandidateRRFID } from  '../../../recruitmentCycle/recruitersTab/index';

@Injectable()

export class RRFReScheduleInterviewService {
    constructor(private http: Http,
        private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    //Get My all reschedule interviews. 
    getMyRescheduleInterviews(grdOptions: GrdOptions, RRFID: CandidateRRFID) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetMyRescheduleHistoryForSelectedRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions,CandidateRRFIDs:RRFID })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    //Get all reschedule interviews. 
    getAllRescheduleInterviews(grdOptions: GrdOptions,RRFID: CandidateRRFID) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetRescheduleHistoryForSelectedRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions,CandidateRRFIDs:RRFID })
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