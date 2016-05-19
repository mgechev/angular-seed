import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { InterviewRoundInfo } from '../models/interviewRoundInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';

@Injectable()
export class InterviewRoundService {

    constructor(private http: Http, private authHttp: AuthHttp) { }

    addInterviewRound(interviewRound: InterviewRoundInfo) {
        let url = Config.GetURL('api/Masters/InterviewRound/Add');
        return this.authHttp.post(url, { interviewRound })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getInterviewRound() {
        let url = Config.GetURL('api/Masters/GetRounds');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

     getInterviewRoundById(id : number) {
        let url = Config.GetURL('api/Masters/InterviewRound/GetRoundsById');
        return this.authHttp.post(url,{ interviewRound:{id:id} })
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteInterviewRound(interviewRound: InterviewRoundInfo) {
        let url = Config.GetURL('api/Masters/InterviewRound/Delete');
        return this.authHttp.post(url, { interviewRound })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editInterviewRound(interviewRound: InterviewRoundInfo) {
        let url = Config.GetURL('api/Masters/InterviewRound/Edit');
        return this.authHttp.post(url, { interviewRound })
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
