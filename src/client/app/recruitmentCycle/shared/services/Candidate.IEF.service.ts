import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
//import { MasterData } from  '../../../shared/model/index';
import { IEFSubmission, iefModel} from '../../Shared/model/ief';

@Injectable()

export class CandidateIEFService {
    constructor(private http: Http,
        private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }
    /**Get current candidate's IEF and interview history details */
    getIEFHistory(_interviewID: iefModel) {
        let url = Config.GetURL('/api/RecruitmentCycle/ViewCandidateAllInterviewDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, _interviewID)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get candidates current interview and RRF details*/
    getCurrentIEFDetails(_iefModel: iefModel) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetCandidateIEFInfo');
        this._spinnerService.show();
        return this.authHttp.post(url, _iefModel)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**submit candidates current ief details */
    saveCurrentIEFDetails(iefDetails: IEFSubmission) {
        let url = Config.GetURL('/api/RecruitmentCycle/UpdateCandidateIEFForm');
        this._spinnerService.show();
        return this.authHttp.post(url, iefDetails)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Get ief funtions from masters */
    getIEFFunctions(interviewType: number) {
        let url = Config.GetURL('/api/Masters/GetIEFFuntionsByInterviewType?TypeID=' + interviewType);
        this._spinnerService.show();
        return this.authHttp.get(url)
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
