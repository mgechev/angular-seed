import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { MasterData  } from '../../../shared/model/common.model';
import { Interview } from '../../shared/model/interview';


@Injectable()
export class ScheduleInterviewService {
    constructor(private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }
    //Post Method to ScheduleInterview
    ScheduleInterviewForCandidate(ScheduleInterview: Interview) {
        let url = Config.GetURL('/api/RecruitmentCycle/ScheduleCandidateInterview');
        this._spinnerService.show();
        return this.authHttp.post(url, { InterviewDetails:ScheduleInterview })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    // GetNominatedInterviewersByRRFID(RRFID: string,RoundID:string) {
    GetNominatedInterviewersByRRFID(RRFID: string) {
        //   let url = Config.GetURL('/api/RecruitmentCycle/GetInterviewersByRRF?RRFID='+ RRFID+'&RoundID='+RoundID);
        let url = Config.GetURL('/api/RecruitmentCycle/GetInterviewersByRRF?RRFID='+ RRFID);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
        // let interviewers: Array<MasterData> = [{
        //     "Id": 11,
        //     "Value": "Rohit Sevaramani"
        // },
        //     {
        //         "Id": 2,
        //         "Value": "Bharati Shinde"
        //     }];
        // return interviewers;

    }

       //Post Method to ScheduleInterview
    GetInterviewDetailsByInterviewID(InterviewID: MasterData) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetCandidateInterviewSchedule');
        this._spinnerService.show();
        return this.authHttp.post(url, { InterviewID })
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
