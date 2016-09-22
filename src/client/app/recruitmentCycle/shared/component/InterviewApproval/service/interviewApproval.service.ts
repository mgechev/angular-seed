import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../../../shared/services/authHttp.service';
import { Config } from '../../../../../shared/config/config';
import { SpinnerService } from '../../../../../shared/components/spinner/spinner';
import { MasterData, GrdOptions } from '../../../../../shared/model/common.model';
import { InterviewApproval } from '../model/interviewApproval';

@Injectable()

export class InterviewApprovalService {
    constructor(private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    //Get list of Interview waiting approval
    getListOfInterviewReqApproval(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetSkippedInterviewsAwaitingApproval');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    //Update status of waiting approval to Approve/Reject
    UpdateInterviewStatus(interviewList: InterviewApproval[]) {
        let url = Config.GetURL('/api/RecruitmentCycle/ActionOnInterviewApproval');
        this._spinnerService.show();
        return this.authHttp.post(url, interviewList)
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
