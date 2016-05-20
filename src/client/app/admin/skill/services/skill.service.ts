import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SkillInfo } from '../models/skillInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()
export class SkillService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    addSkill(skill: SkillInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/Skill/Add');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { skill })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getSkills() {
        let authenticateUrl = Config.GetURL('/api/Masters/GetSkills');
        this._spinnerService.show();
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

     getSkillById(id:string) {
        let authenticateUrl = Config.GetURL('/api/Masters/Skill/GetSkillById');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl,{ skill:{id:id} })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    deleteSkill(skill: SkillInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/Skill/Delete');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { skill })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editSkill(skill: SkillInfo) {
        let authenticateUrl = Config.GetURL('/api/Master/Skill/Edit');
        this._spinnerService.show();
        return this.authHttp.post(authenticateUrl, { skill })
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
