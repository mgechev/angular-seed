import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { RRFDetails } from '../models/rrfDetails';

@Injectable()

export class MyRRFService {

    constructor(private authHttp: AuthHttp) { }

    //Get List of RRF raised by login User
    getRaisedRRF(userName: string, roleID: Number) {
        let url = Config.GetURL('/api/RRF/GetRaisedRRF');
        return this.authHttp.post(url, { UserName: userName, Role: roleID })
            .map(this.extractData)
            .catch(this.handleError);
    }

    //Get details of RRF from RRFID
    getRRFDetails(rrfId: number) {
        let url = Config.GetURL('/api/RRF/ViewRRF');
        return this.authHttp.post(url, { RRFID: rrfId })
            .map(this.extractData)
            .catch(this.handleError);
    }

    //Save new RRF
    raiseRRF(rrfDetails: RRFDetails) {
        let url = Config.GetURL('/api/RRF/RaiseRRF');
        return this.authHttp.post(url, { rrfDetails })
            .map(this.extractData)
            .catch(this.handleError);
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
