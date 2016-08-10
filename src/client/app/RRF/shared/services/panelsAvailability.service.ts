import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { MasterData  } from '../../../shared/model/common.model';
@Injectable()
export class PanelsAvailabilityService {
    constructor(private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    //Get RRf Specific Availability of All Interviewers assigned to this RRF
    getAvailabilityForRRF(RRFID: MasterData) {
        //TODO: Change URL after discussion with backend
        let url = Config.GetURL('/api/RecruitmentCycle/GetInterviewersAvalabilityForRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { RRFID: RRFID })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    sendRequest(Interviewer: MasterData) {
        //TODO: Change URL after discussion with backend
        let url ='';
        //let url = Config.GetURL('/api/RecruitmentCycle/GetInterviewersAvalabilityForRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { Interviewer: Interviewer })
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
