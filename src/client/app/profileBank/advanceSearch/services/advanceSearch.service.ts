import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CandidateProfile, ResumeMeta} from '../../shared/model/myProfilesInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { GrdOptions } from  '../../../shared/model/index';

@Injectable()
export class AdvanceSearchService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }
    //This function contains advance search API
    getAdvanceSearch(searchString:string){
        let url = Config.GetURL('/api/RecruitmentCycle/CandidateAdvancedSearch?searchValue='+searchString+'&startRow=1&rowLimit=20');
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
