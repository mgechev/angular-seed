import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()

export class RRFDashboardService {
    constructor(private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    getAllRRF() {
        let url = Config.GetURL('/api/RRF/GetAllRRF');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getStatuswiseRRFCount() {
        let url = Config.GetURL('/api/RRF/GetStatuswiseRRFCount');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getAssignedRRFDeatils(rrfId: number) {
        let url = Config.GetURL('/api/RRF/GetAssignedRRFDeatils');
        this._spinnerService.show();
        return this.authHttp.post(url, { RRFID: rrfId })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    saveRRFAssignmentDeatils(rrfId: number, assignedTo: number[], comment: string) {
        let url = Config.GetURL(' /api/RRF/SaveRRFAssignmentDeatils');
        this._spinnerService.show();
        return this.authHttp.post(url, { RRFID: rrfId, AssignedTo: assignedTo, AssignedComments: comment })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    unassignRRF(rrfId: number, assignedTo: number, comment: string) {
        let url = Config.GetURL(' /api/RRF/UnassignRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { RRFID: rrfId, AssignedTo: assignedTo, UnassigningComment: comment })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getMyRRF() {
        let url = Config.GetURL('/api/RRF/GetMyRRF');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getStatuswiseMyRRFCount() {
        let url = Config.GetURL('/api/RRF/GetStatuswiseMyRRFCount');
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

