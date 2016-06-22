import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MyProfilesInfo, ResumeMeta} from '../../shared/model/myProfilesInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()
export class MyProfilesService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    UploadCandidateProfile(resumeMeta: ResumeMeta) {
        //let url = Config.GetURL('/api/ProfileBank/UploadCandidateProfile');
        // this._spinnerService.show();
        // return this.authHttp.post(url, { resumeMeta })
        //     .map(this.extractData)
        //     .catch(this.handleError)
        //     .finally(() => this._spinnerService.hide());


        // console.log('files : '+body);
        // let headers = new Headers();
        // this.createAuthorizationHeader(headers);
        // headers.append('server_type', '');
        // headers.append('Content-Type', undefined);
        // let options = new RequestOptions({ headers: headers });
        // return this.http.post(url, resumeMeta, options)
        //     .map(this.extractData)
        //     .catch(this.handleError);

        // let formData: FormData = new FormData(),
        //     xhr: XMLHttpRequest = new XMLHttpRequest();

        // formData.append('uploads[]', resumeMeta.Profile, resumeMeta.Profile.FileName);

        // xhr.open('POST', url, true);
        // xhr.send(formData);
    }

    public upload(url: string, files: File[]): Promise<any> {
        return new Promise((resolve, reject) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append('Profile', files[i], files[i].name);
                formData.append('CandidateLookupId', 54);
                formData.append('Overwrite', false);
            }
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
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
