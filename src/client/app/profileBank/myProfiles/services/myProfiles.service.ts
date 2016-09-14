import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CandidateProfile, ResumeMeta} from '../../shared/model/myProfilesInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { GrdOptions } from  '../../../shared/model/index';

@Injectable()
export class MyProfilesService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    public upload(resumeMeta: ResumeMeta) {

        let url = Config.GetURL('/api/ProfileBank/UploadCandidateProfile');
        return new Promise((resolve, reject) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append('Profile', resumeMeta.Profile, resumeMeta.Profile.name);
            formData.append('CandidateID', resumeMeta.CandidateID.Id);
            formData.append('Overwrite', resumeMeta.Overwrite);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
            xhr.send(formData);
        });
    }
    isExist(newProfile: CandidateProfile) {
        /**TODO::Replace api once its Ready from backend */
        let url = Config.GetURL('/api/ProfileBank/getMyProfiles');
        this._spinnerService.show();
        return this.authHttp.post(url, newProfile)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    getMyProfiles(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/ProfileBank/getMyProfiles');
        this._spinnerService.show();
        return this.authHttp.post(url, { grdOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    addCandidateProfile(profile: CandidateProfile) {
        let url = Config.GetURL('/api/ProfileBank/addCandidateProfile');
        this._spinnerService.show();
        return this.authHttp.post(url, { profile })
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
