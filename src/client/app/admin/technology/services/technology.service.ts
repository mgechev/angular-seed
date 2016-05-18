import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TechnologyInfo } from '../models/technologyInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';

@Injectable()
export class TechnologyService {

    constructor(private http: Http, private authHttp: AuthHttp) { }

    addTechnology(technology: TechnologyInfo) {
        let url = Config.GetURL('api/Masters/Technology/Add');
        return this.authHttp.post(url, { technology })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getTechnologies() {
        let url = Config.GetURL('api/Masters/GetTechnologies');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

     getTechnologyById(id: number) {
        let url = Config.GetURL('api/Masters/Technology/GetTechnologyById');
        return this.authHttp.post(url,{ technology:{id:id} })
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteTechnology(technology: TechnologyInfo) {
        let url = Config.GetURL('api/Masters/Technology/Delete');
        return this.authHttp.post(url, { technology })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editTechnology(technology: TechnologyInfo) {
        let url = Config.GetURL('api/Masters/Technology/Edit');
        return this.authHttp.post(url, { technology })
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