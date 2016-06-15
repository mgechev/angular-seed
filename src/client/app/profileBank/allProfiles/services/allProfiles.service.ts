import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TransferOwnershipMeta} from '../../shared/model/myProfilesInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()

export class AllProfilesService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    getAllProfiles() {
        let url = Config.GetURL('/api/ProfileBank/getOpenProfiles');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

     updateOwnership(Ownership: TransferOwnershipMeta) {
        let url = Config.GetURL('api/ProfileBank/updateOwnership');
        this._spinnerService.show();
        return this.authHttp.post(url, { Ownership })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getCandidateOwnwershipInfo(candidateIds: Array<string>) {
        let url = Config.GetURL('/api/ProfileBank/getCandidateOwnwershipInfo');
        this._spinnerService.show();
        return this.authHttp.post(url, { Ids: candidateIds })
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
