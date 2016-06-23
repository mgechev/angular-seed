import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { RRFDetails } from '../models/rrfDetails';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()

export class MyRRFService {

    constructor(private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }

    //Get List of RRF raised by login User
    getRaisedRRF(userName: string, roleID: Number) {
        let url = Config.GetURL('/api/RRF/GetRaisedRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { UserName: userName, Role: roleID })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    //Get details of RRF from RRFID
    getRRFDetails(rrfId: string) {
        let url = Config.GetURL('/api/RRF/ViewRRF?RRFID='+rrfId);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    //Save new RRF
    raiseRRF(rrfDetails: RRFDetails) {
        let url = Config.GetURL('/api/RRF/RaiseRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { rrfDetails })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getRRFByID(rrfId: string) {
        let url = Config.GetURL('/api/RRF/GetRRFByID?RRFID='+rrfId);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    //Save new RRF
    UpdateRRF(rrfDetails: RRFDetails) {
        let url = Config.GetURL('/api/RRF/UpdateRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { rrfDetails })
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
