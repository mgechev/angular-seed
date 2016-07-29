import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
// import { MasterData } from  '../../../shared/model/index';
// import { AwaitedInterview} from '../../Shared/model/Interview';
import { GrdOptions } from '../../../shared/model/common.model';

@Injectable()

export class InterviewersScheduleService {
    constructor(private http: Http,
        private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) { }
    //Get all interviews assigned and accepted by current logged in user. 
    getMyInterviews() {
        let url = Config.GetURL('/api/RecruitmentCycle/GetUserInterviewDetails');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Comenting this Funcations as this feature is deprecated */
    //Get interviews list which are in waiting for resopnse. 
    // getAwaitedInterviews() {
    //     let url = Config.GetURL('/api/RecruitmentCycle/GetInterviewerAwaitingConfirmationInterviews');
    //     this._spinnerService.show();
    //     return this.authHttp.get(url)
    //         .map(this.extractData)
    //         .catch(this.handleError)
    //         .finally(() => this._spinnerService.hide());
    // }

    /**Commenting as this fuctionality is depricated */
    // acceptAwaitedInterview(_rrfID: MasterData) {
    //     let url = Config.GetURL('/api/RecruitmentCycle/GetInterviewerAwaitingConfirmationInterviews');
    //     this._spinnerService.show();
    //     return this.authHttp.post(url, { _rrfID })
    //         .map(this.extractData)
    //         .catch(this.handleError)
    //         .finally(() => this._spinnerService.hide());
    // }
    // rejectAwaitedInterview(_awaitedRRF: AwaitedInterview) {
    //     let url = Config.GetURL('/api/RecruitmentCycle/GetInterviewerAwaitingConfirmationInterviews');
    //     this._spinnerService.show();
    //     return this.authHttp.post(url, { _awaitedRRF })
    //         .map(this.extractData)
    //         .catch(this.handleError)
    //         .finally(() => this._spinnerService.hide());
    // }

    getMyAllInterviewsDetailsOfCalendar() {
        let url = Config.GetURL('/api/RecruitmentCycle/CalendarViewGetMyBookedCalendar');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getResources() {
        return [{ id: 1, title: 'InterViewer A', eventColor: this.generateHexColors() },
            { id: 2, title: 'InterViewer B', eventColor: this.generateHexColors() },
            { id: 3, title: 'InterViewer C', eventColor: this.generateHexColors() }];
    }
    getEvent() {
        return [{
            'id': 1,
            'resourceId': 3,
            'title': 'All Day EventAll Day EventAll Day EventAll Day EventAll Day EventAll Day EventAll Day Event',
            'start': '2016-01-01'
        }]
    }

    generateHexColors() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }

    GetMyAllConductedInerviews(grdOptions: GrdOptions) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetMyAllConductedInerviews');
        this._spinnerService.show();
         return this.authHttp.post(url ,{grdOptions})
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
