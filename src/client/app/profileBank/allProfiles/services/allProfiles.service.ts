import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MasterData, GrdOptions } from  '../../../shared/model/index';
//import { TransferOwnershipMeta} from '../../shared/model/myProfilesInfo';
//import { GridOperations} from '../../shared/model/myProfilesInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()

export class AllProfilesService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    getAllProfiles(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/ProfileBank/getAllProfiles');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getOpenProfiles(grdOptions: GrdOptions) {
        ///api/ProfileBank/GetOpenProfiles1?PerPageCount=3&ButtonClicked=-1&IDs=90,106,109
        // let url = Config.GetURL('/api/ProfileBank/GetOpenProfiles1?PerPageCount='+grdOptions.PerPageCount+
        //         '&ButtonClicked='+grdOptions.ButtonClicked+'&IDs='+grdOptions.IDColl);
        let url = Config.GetURL('/api/ProfileBankPaging/GetOpenProfiles');
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
