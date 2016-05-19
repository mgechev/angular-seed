import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';

@Injectable()

export class RRFDashboardService {
    constructor(private authHttp: AuthHttp) { }

    getAllRRF() {
        let url = Config.GetURL('/api/RRF/GetAllRRF');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getStatuswiseRRFCount() {
        let url = Config.GetURL('/api/RRF/GetStatuswiseRRFCount');
        return this.authHttp.get(url)
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
