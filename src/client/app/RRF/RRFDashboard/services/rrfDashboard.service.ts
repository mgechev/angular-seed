import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { MasterData, GrdOptions } from '../../../shared/model/common.model';

@Injectable()

export class RRFDashboardService {
    constructor(private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    getAllOpenRRF() {
        let url = Config.GetURL('/api/RRF/GetAllOpenRRF');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    getAllRRF(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RRF/GetAllRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getStatuswiseRRFCount() {
        let url = Config.GetURL('/api/RRF/GetStatuswiseAllRRFCount');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getAssignedRRFDeatils(rrfId: number) {
        let url = Config.GetURL('/api/RRF/GetAssignedRRFDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, { RRFID: rrfId })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    saveRRFAssignmentDeatils(rrfId: MasterData, assignedTo: MasterData[], comment: string) {
        let url = Config.GetURL('/api/RRF/SaveRRFAssignmentDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, { RRFID: rrfId, AssignedTo: assignedTo, AssignedComments: comment })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    unassignRRF(rrfId: MasterData, assignedTo: MasterData, comment: string) {
        let url = Config.GetURL('/api/RRF/UnassignRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { RRFID: rrfId, AssignedTo: assignedTo, UnassigningComment: comment })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getMyRRF(grdOptions: GrdOptions) {
        // let url = Config.GetURL('/api/RRF/GetMyRRF?PerPageCount=' + gridOperations.PerPageCount +
        //     '&ButtonClicked=' + gridOperations.ButtonClicked + '&IDs=' + gridOperations.IDColl +
        //     '&OrderBy=' + gridOperations.OrderBy + '&Order=' + gridOperations.Order);
        let url = Config.GetURL('/api/RRF/GetMyRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
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
    getStatuswiseAssignedRRFCount() {
        let url = Config.GetURL('/api/RRF/GetStatuswiseMyRRFCount');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    closeRRF(rrfId: MasterData, closeComment: string) {
        let url = Config.GetURL('/api/RRF/CloseRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { RRFID: rrfId, CloseComment: closeComment })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getCurrentLoggedInUser() {
        let url = Config.GetURL('/api/authentication/getCurrentUserName');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    GetRRFAssignedToRecruiter(recruiter: MasterData, grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RRF/GetRRFAssignedToRecruiter');
        this._spinnerService.show();
        return this.authHttp.post(url, { RecruiterRRFs: { recruiter, GrdOptions: { grdOptions } } })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    GetAllUnAssignedRRF(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RRF/GetRRFUnAssignedToRecruiter');
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

