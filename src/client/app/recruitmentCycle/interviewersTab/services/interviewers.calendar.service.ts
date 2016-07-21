import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()

export class InterviewersCalendarService {
    Events: any[];
    constructor(private http: Http,
        private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) {
        this.Events = [{
            'id': 1,
            'resourceId': 3,
            'title': 'All Day EventAll Day EventAll Day EventAll Day EventAll Day EventAll Day EventAll Day Event',
            'start': '2016-01-01'
           },
            {
                'id': 2,
                'resourceId': 1,
                'title': 'Long Event',
                'start': '2016-01-07',
                'end': '2016-01-10'
            },
            {
                'id': 3,
                'resourceId': 2,
                'title': 'Repeating Event',
                'start': '2016-01-09T16:00:00'
            },
            {
                'id': 4,
                'resourceId': 1,
                'title': 'Repeating Event',
                'start': '2016-01-16T16:00:00'
            },
            {
                'id': 5,
                'resourceId': 1,
                'title': 'Conference',
                'start': '2016-01-11',
                'end': '2016-01-13'
            },
            {
                'id': 6,
                'resourceId': 3,
                'title': 'TestForOBjeect',
                'start': '2016-01-12T10:30:00',
                'end': '2016-01-12T14:30:00',
            },
            {
                'id': 7,
                'resourceId': 2,
                'title': 'Lunch',
                'start': '2016-01-12T12:00:00'
            },
            {
                'id': 8,
                'resourceId': 1,
                'title': 'Meeting',
                'start': '2016-01-12T14:30:00'
            },
            {
                'id': 9,
                'title': 'Happy Hour',
                'start': '2016-01-12T17:30:00'
            },
            {
                'id': 10,
                'title': 'Dinner',
                'start': '2016-01-12T20:00:00'
            },
            {
                'id': 11,
                'title': 'Birthday Party',
                'start': '2016-01-13T07:00:00'
            },
            {
                'id': 12,
                'title': 'Click for Google',
                'url': 'http://google.com/',
                'start': '2016-01-28'
            }
        ];
    }
    /**Get Current Logged in user availability and booked slot information to display in calendar */
    /**API needs to be update */
    getMyAvailability() {
        let url = Config.GetURL('/api/RecruitmentCycle/CalendarViewGetMyInterviewCalendar');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /** save current users selected slot information to the service */
    /**API needs to be update */
    submitAvailabilitySlots() {
        let url = Config.GetURL('/api/RecruitmentCycle/GetUserInterviewDetails');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

     GetResources() {
         let url = Config.GetURL('/api/RecruitmentCycle/CalendarViewGetResources');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
      //  return this.InterviewCalendarDetails.Resources;
    }

    getCalendarEventData() {
        return this.Events;
    }
    getResources_1() {
        return [{ id: 1, title: 'InterViewer A', eventColor: this.generateHexColors() },
            { id: 2, title: 'InterViewer B', eventColor: this.generateHexColors() },
            { id: 3, title: 'InterViewer C', eventColor: this.generateHexColors() }];
    }
    generateHexColors() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
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
