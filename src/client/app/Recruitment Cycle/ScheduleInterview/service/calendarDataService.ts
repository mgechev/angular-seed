import { Injectable } from '@angular/core';
import { MasterData  } from '../../../shared/model/common.model';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import {CalendarDetails} from '../model/CalendarDetails';

@Injectable()
export class CalendarDataService {
    checkedItemIds: Array<string> = [];
    Events: any[];
    InterviewCalendarDetails: CalendarDetails = new CalendarDetails();
    constructor(private authHttp: AuthHttp,
        private _spinnerService: SpinnerService) {
        this.InterviewCalendarDetails.Events = [
             {
                "id": 40,
                "resourceId": 1,
                "title": "EBS - Mahesh Nagawade",
                "start": "2016-07-13T11:00:00",
                "end": "2016-07-13T13:00:00"
            },
            {
                "id": 41,
                "resourceId": 2,
                "title": "EBS - Mahesh Nagawade",
                "start": "2016-07-14T11:00:00",
                "end": "2016-07-14T13:00:00"
            },
            {
                "id": 42,
                "resourceId": 1,
                "title": "ebs - Shrikant Mane",
                "start": "2016-07-13T11:00:00",
                "end": "2016-07-13T14:00:00"
            },
            {
                "id": 43,
                "resourceId": 2,
                "title": "ebs - Shrikant Mane",
                "start": "2016-07-12T13:00:00",
                "end": "2016-07-12T14:00:00"
            }
            // {
            //     'id': 5,
            //     'resourceId': 1,
            //     'title': 'Conference',
            //     'start': '2016-01-11',
            //     'end': '2016-01-13'
            // },
            // {
            //     'id': 6,
            //     'resourceId': 2,
            //     'title': 'Meeting',
            //     'start': '2016-01-12T10:30:00',
            //     'end': '2016-01-12T12:30:00'
            // }
        ];
        this.InterviewCalendarDetails.Resources = [
            { id: 1, title: 'Available', eventColor: 'Green' },
            { id: 2, title: 'Booked', eventColor: 'Red' }
        ];
    }
    getDropDown() {
        return {
            'Nominations': [
                {
                    'id': 1,
                    'value': 'Shrikant'
                },
                {
                    'id': 2,
                    'value': 'Shailesh'
                }
            ],
            'Others': [
                {
                    'id': 115,
                    'value': 'Aradhana'
                },
                {
                    'id': 116,
                    'value': 'Mahesh'
                },
                {
                    'id': 117,
                    'value': 'Rohit'
                }
            ]
        };
    }

    getResources() {
        return [{ id: 1, title: 'InterViewer A', eventColor: this.generateHexColors() },
            { id: 2, title: 'InterViewer B', eventColor: this.generateHexColors() },
            { id: 3, title: 'InterViewer C', eventColor: this.generateHexColors() }];
    }
    getCalendarEventData() {
        // return [
        //     {
        //         title: 'Event 1',
        //         resourceId: 1,
        //         start: '2016-07-01T15:00',
        //         StartTime: '15:00',
        //         EndTime: '17:00',
        //         Status: 'Available',
        //         interviewer: 'InterViewer A'
        //     },
        //     {
        //         id: '1',
        //         resourceId: 1,
        //         start: '2016-07-07T02:00:00',
        //         end: '2016-05-07T07:00:00',
        //         title: 'event 1',
        //         interviewer: 'InterViewer A',
        //         Status: 'Available'
        //     },
        //     {
        //         id: '2',
        //         resourceId: 1,
        //         start: '2016-07-08T05:00:00',
        //         end: '2016-07-08T22:00:00',
        //         interviewer: 'InterViewer A',
        //         title: 'event 2',
        //         Status: 'Available'
        //     },
        //     {
        //         id: '3',
        //         resourceId: 2,
        //         start: '2016-07-09',
        //         end: '2016-05-08',
        //         title: 'event 3',
        //         interviewer: 'InterViewer B',
        //         Status: 'Available'
        //     },
        //     {
        //         id: '4',
        //         resourceId: 3,
        //         start: '2016-07-12T03:00:00',
        //         end: '2016-07-12T08:00:00',
        //         interviewer: 'InterViewer C',
        //         title: 'event 4',
        //         Status: 'Available'
        //     },
        //     {
        //         id: '5',
        //         resourceId: 2,
        //         start: '2016-07-19T00:30:00',
        //         end: '2016-07-19T02:30:00',
        //         interviewer: 'InterViewer B',
        //         title: 'event 5',
        //         Status: 'Busy'
        //     }
        // ];
        return this.Events;
    }

    SaveEvent(index: number, Event: any) {
        this.Events[index] = Event;
    }
    generateHexColors() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
    //Get InterViewer's All Events Available And Booked Slots by InterViewerID
    GetInterviewerCalendarByID(InterViewerID: MasterData) {
        let url = Config.GetURL('/api/RecruitmentCycle/GetInterviewerByIdCalendar');
        this._spinnerService.show();
        return this.authHttp.post(url, { InterviewerId: InterViewerID })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    //Get All InterViewer's All Events Available And Booked Slots 
    GetInterviewerCalendarDetail(InterViewers: Array<MasterData>) {
        //TODO : Change URL
        /*  let url = Config.GetURL('/api/RecruitmentCycle/GetInterviewerByIdCalendar');
          this._spinnerService.show();
          return this.authHttp.post(url, { InterViewers })
              .map(this.extractData)
              .catch(this.handleError)
              .finally(() => this._spinnerService.hide());*/
        return this.InterviewCalendarDetails;
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