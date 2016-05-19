import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';

@Injectable()

export class RRFApprovalService {
    constructor(private authHttp: AuthHttp) { }

    getRRFApprovalList(userName: string, roleID: Number) {
        let url = Config.GetURL('/api/RRF/GetAllRaisedRRF');
        return this.authHttp.post(url, { UserName: userName, Role: roleID })
            .map(this.extractData)
            .catch(this.handleError);
    }

    ActionOnRaisedRRF(rrfID: number, status: number, comment: string) {
        let url = Config.GetURL('/api/RRF/ActionOnRaisedRRF');
        return this.authHttp.post(url, { RRFID: rrfID, Status: status, Comments: comment })
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
