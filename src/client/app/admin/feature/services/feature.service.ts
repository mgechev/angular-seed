import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FeatureInfo } from '../models/featureInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import {GridOptions} from '../../../shared/components/rmsGrid/models/gridOptions';
import { Config } from '../../../shared/config/config';

@Injectable()
export class FeatureService {

    constructor(private authHttp: AuthHttp) { }

    addFeature(feature: FeatureInfo) {
        let url = Config.GetURL('/api/Feature/Add');
        return this.authHttp.post(url, { feature })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getFeatures(gridOptions: GridOptions) {
        let url = Config.GetURL('/api/Feature/GetFeatures');
        return this.authHttp.post(url, { gridOptions })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getFeatureById(id: number) {
        let url = Config.GetURL('/api/Feature/GetFeatureById');
        return this.authHttp.post(url, { feature: { Id: id } })
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteFeature(feature: FeatureInfo) {
        let url = Config.GetURL('/api/Feature/Delete');
        return this.authHttp.post(url, { feature })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editFeature(feature: FeatureInfo) {
        let url = Config.GetURL('/api/Feature/Edit');
        return this.authHttp.post(url, { feature })
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
