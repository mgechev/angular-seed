import { Injectable } from '@angular/core';

@Injectable()
export class CalendarDataService {
    checkedItemIds: Array<string> = [];
    Events: any[];
    constructor() {
        this.Events = [{
            'id': 1,
            'resourceId': 'c',
            'title': 'All Day Event',
            'start': '2016-01-01'
        },
            {
                'id': 2,
                'resourceId': 'a',
                'title': 'Long Event',
                'start': '2016-01-07',
                'end': '2016-01-10'
            },
            {
                'id': 3,
                'resourceId': 'b',
                'title': 'Repeating Event',
                'start': '2016-01-09T16:00:00'
            },
            {
                'id': 4,
                'resourceId': 'a',
                'title': 'Repeating Event',
                'start': '2016-01-16T16:00:00'
            },
            {
                'id': 5,
                'resourceId': 'a',
                'title': 'Conference',
                'start': '2016-01-11',
                'end': '2016-01-13'
            },
            {
                'id': 6,
                'resourceId': 'c',
                'title': 'Meeting',
                'start': '2016-01-12T10:30:00',
                'end': '2016-01-12T12:30:00'
            },
            {
                'id': 7,
                'resourceId': 'b',
                'title': 'Lunch',
                'start': '2016-01-12T12:00:00'
            },
            {
                'id': 8,
                'resourceId': 'a',
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
    getDropDown() {
        return {
            'Nominations': [
                {
                    'id': 1,
                    'value': 'Alabama'
                },
                {
                    'id': 2,
                    'value': 'Alaska'
                }
            ],
            'Others': [
                {
                    'id': 115,
                    'value': 'California'
                },
                {
                    'id': 116,
                    'value': 'Colorado'
                },
                {
                    'id': 117,
                    'value': 'Connecticut'
                }
            ]
        };
    }

    getCalendarEventData() {
        // return [
        //     {
        //         title: 'Event 1',
        //         resourceId: 'a',
        //         start: '2016-07-01T15:00',
        //         StartTime: '15:00',
        //         EndTime: '17:00',
        //         Status: 'Available',
        //         interviewer: 'InterViewer A'
        //     },
        //     {
        //         id: '1',
        //         resourceId: 'a',
        //         start: '2016-07-07T02:00:00',
        //         end: '2016-05-07T07:00:00',
        //         title: 'event 1',
        //         interviewer: 'InterViewer A',
        //         Status: 'Available'
        //     },
        //     {
        //         id: '2',
        //         resourceId: 'a',
        //         start: '2016-07-08T05:00:00',
        //         end: '2016-07-08T22:00:00',
        //         interviewer: 'InterViewer A',
        //         title: 'event 2',
        //         Status: 'Available'
        //     },
        //     {
        //         id: '3',
        //         resourceId: 'b',
        //         start: '2016-07-09',
        //         end: '2016-05-08',
        //         title: 'event 3',
        //         interviewer: 'InterViewer B',
        //         Status: 'Available'
        //     },
        //     {
        //         id: '4',
        //         resourceId: 'c',
        //         start: '2016-07-12T03:00:00',
        //         end: '2016-07-12T08:00:00',
        //         interviewer: 'InterViewer C',
        //         title: 'event 4',
        //         Status: 'Available'
        //     },
        //     {
        //         id: '5',
        //         resourceId: 'b',
        //         start: '2016-07-19T00:30:00',
        //         end: '2016-07-19T02:30:00',
        //         interviewer: 'InterViewer B',
        //         title: 'event 5',
        //         Status: 'Busy'
        //     }
        // ];
        return this.Events;
    }

    SaveEvent(index:number,Event:any) {
        this.Events[index] = Event;
    }
}
