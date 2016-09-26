import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import {  RRFFeedback } from '../../myRRF/models/rrfDetails';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import {  GrdOptions } from '../../../shared/model/common.model';

@Injectable()

export class FeedbackPendingService {

    constructor(private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    //Get List of RRF waiting for Freeze or feedback
    getFeedbackPendingRRF(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RRF/GetFeedbackRRFs');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    //get logIn user Details
    getCurrentLoggedInUser() {

        let url = Config.GetURL('/api/authentication/getCurrentUserName');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    //Freeze RRF
    freezeRRF(RRFFeedbacks: RRFFeedback[]) {
        let url = Config.GetURL('/api/RRF/FreezeRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { RRFFeedbacks })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    //Save Recruiter Head Feedback against RRF 
    FeedbackToRRFFormRH(RRFFeedbacks: RRFFeedback[]) {
        let url = Config.GetURL('/api/RRF/SaveRRFFeedback');
        this._spinnerService.show();
        return this.authHttp.post(url, { RRFFeedbacks })
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
