import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { MasterData  } from '../../../shared/model/common.model';

@Injectable()
export class RRFCandidateListService {
    constructor(private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    //Get RRf Specific Candidates by RRFID - API will return list of Candidates
    getCandidatesForRRF(RRFID: string) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetCandidatesForRRF?RRFID=' + RRFID);
       //let url = Config.GetURL('/api/RecruitmentCycle/GetCandidatesForRRF');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    //This Method is used to get Interview rounds history by passing CandidateID and RRFID
    getInterviewRoundHistorybyCandidateId(CandidateID: MasterData, RRFID: MasterData) {
        //ASK backend team - IS API READY? Change URL
        let url = Config.GetURL('/api/RecruitmentCycle/ViewCandidateInterviewSchedule');
        this._spinnerService.show();
        return this.authHttp.post(url,{CandidateID:CandidateID,RRFID:RRFID})
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getRRFByID(RRFID: string) {
        let url = Config.GetURL('/api/RRF/GetRRFByID?RRFID='+RRFID);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    proceedForOfferGeneration(InterviewID: MasterData) {
        let url = Config.GetURL('/api/RecruitmentCycle/ProceedForOfferGeneration');
        this._spinnerService.show();
        return this.authHttp.post(url,{InterviewID})
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    UpdateCandidateIEFStatus(InterviewID : MasterData , Status : string , Comments : string){
        let url = Config.GetURL('/api/RecruitmentCycle/UpdateCandidateIEFStatus');
        this._spinnerService.show();
        return this.authHttp.post(url,{InterviewID,Status,Comments})
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
