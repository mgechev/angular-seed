import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SkillInfo } from '../models/skillInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';

@Injectable()
export class SkillService {

    constructor(private http: Http, private authHttp: AuthHttp) { }

    addSkill(skill: SkillInfo) {      
        let authenticateUrl = Config.GetURL('/api/Master/Skill/Add');
        return this.authHttp.post(authenticateUrl, { skill })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getSkills() {       
        let authenticateUrl = Config.GetURL('/api/Masters/GetSkills');
        return this.authHttp.get(authenticateUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

     getSkillById(id:string) {      
        let authenticateUrl = Config.GetURL('/api/Masters/Skill/GetSkillById');
        return this.authHttp.post(authenticateUrl,{ skill:{id:id} })
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteSkill(skill: SkillInfo) {      
        let authenticateUrl = Config.GetURL('/api/Master/Skill/Delete');
        return this.authHttp.post(authenticateUrl, { skill })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editSkill(skill: SkillInfo) {        
        let authenticateUrl = Config.GetURL('/api/Master/Skill/Edit');
        return this.authHttp.post(authenticateUrl, { skill })
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