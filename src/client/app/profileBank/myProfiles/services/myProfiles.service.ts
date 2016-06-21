import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MyProfilesInfo, ResumeMeta} from '../../shared/model/myProfilesInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()
export class MyProfilesService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    UploadCandidateProfile(resumeMeta: ResumeMeta) {
        let url = Config.GetURL('/api/ProfileBank/UploadCandidateProfile');
        // this._spinnerService.show();
        // return this.authHttp.post(url, { resumeMeta })
        //     .map(this.extractData)
        //     .catch(this.handleError)
        //     .finally(() => this._spinnerService.hide());

        // let body = JSON.stringify({ resumeMeta: ResumeMeta });
        // console.log('files : '+body);
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        headers.append('server_type', '');
        headers.append('Content-Type', undefined);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, resumeMeta, options)
            .map(this.extractData)
            .catch(this.handleError);

        // let formData: FormData = new FormData(),
        //     xhr: XMLHttpRequest = new XMLHttpRequest();

        // formData.append('uploads[]', resumeMeta.Profile, resumeMeta.Profile.FileName);

        // xhr.open('POST', url, true);
        // xhr.send(formData);
    }

    createAuthorizationHeader(headers: Headers) {
        if (localStorage.getItem('access_token') !== null) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        }
    }

    //TODO : Chnge API URL to /api/ProfileBank/getMyProfiles
    getMyProfiles() {
        let url = Config.GetURL('/api/ProfileBank/getMyProfiles');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    addCandidateProfile(profile: MyProfilesInfo) {
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
