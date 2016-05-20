import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FeatureInfo } from '../models/featureInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import {GridOptions} from '../../../shared/components/rmsGrid/models/gridOptions';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()
export class FeatureService {

    constructor(private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    addFeature(feature: FeatureInfo) {
        let url = Config.GetURL('/api/Feature/Add');
        return this.authHttp.post(url, { feature })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getFeatures(gridOptions: GridOptions) {
        let url = Config.GetURL('/api/Feature/GetFeatures');
        this._spinnerService.show();
        return this.authHttp.post(url, { gridOptions })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getFeatureById(id: number) {
        let url = Config.GetURL('/api/Feature/GetFeatureById');
        this._spinnerService.show();
        return this.authHttp.post(url, { feature: { Id: id } })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    deleteFeature(feature: FeatureInfo) {
        let url = Config.GetURL('/api/Feature/Delete');
        this._spinnerService.show();
        return this.authHttp.post(url, { feature })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editFeature(feature: FeatureInfo) {
        let url = Config.GetURL('/api/Feature/Edit');
        this._spinnerService.show();
        return this.authHttp.post(url, { feature })
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
