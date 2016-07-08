import {Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import { FullCalendarComponent} from  '../../../shared/components/calendar/fullCalendar';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {CalendarDataService} from '../service/calendarDataService';
import {MyEvent} from '../model/CalendarDetails';

@Component({
    moduleId: module.id,
    selector: 'schedule-interview',
    templateUrl: 'scheduleCandidateInterview.component.html',
    directives: [ROUTER_DIRECTIVES, SELECT_DIRECTIVES, FullCalendarComponent],
    styleUrls: ['ScheduleCandidateInterviewComponent.css'],
})

export class ScheduleCandidateInterviewComponent implements OnInit {
    resources = [{ id: 'a', title: 'InterViewer A', eventColor: '#a64110' },
        { id: 'b', title: 'InterViewer B', eventColor: 'green' },
        { id: 'c', title: 'InterViewer C', eventColor: '#85c110' }];

    events: any[];
    data: any;
    header: any;
    event: MyEvent;

    dialogVisible: boolean = false;

    idGen: number = 100;
    modal: any = $('#fullCalModal');
    InterviewerMultiselect: any = $('#cmbInterviewers');

    constructor(private _router: Router, private _calendarDataService: CalendarDataService, private cd: ChangeDetectorRef) {

    }



    ngOnInit() {
        this.events = this._calendarDataService.getCalendarEventData();
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        this.data = this._calendarDataService.getDropDown();
        $('#cmbInterviewers').select2();
    }

    handleDayClick(event: any) {
        this.event = new MyEvent();
        this.event.start = event.date.format();
        this.dialogVisible = true;
        $('#fullCalModal').modal();
        //trigger detection manually as somehow only moving the mouse quickly after
        // click triggers the automatic detection
        this.cd.detectChanges();
    }

    handleEventClick(e: any) {
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;

        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }

        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.resourceId = e.calEvent.resourceId;
        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
        this.cd.detectChanges();
        $('#fullCalModal').modal();
    }

    saveEvent() {
        //update
        if (this.event.id) {
            let index: number = this.findEventIndexById(this.event.id);
            //_.findIndex(this.events, { id: this.event.id });
            if (index >= 0) {
                //this.events[index] = this.event;
                this._calendarDataService.SaveEvent(index, this.event);
            }
        }
        //new
        else {
            this.event.id = this.idGen;
            this.events.push(this.event);
            this.event = null;
        }
        this.cd.detectChanges();

        $('#fullCalModal').modal('toggle');
        this.dialogVisible = false;
    }

    deleteEvent() {
        let index: number = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
        $('#fullCalModal').modal('toggle');
        this.cd.detectChanges();

    }

    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id === this.events[i].id) {
                index = i;
                break;
            }
        }

        return index;
    }
    redirectToPreviousView() {
        //  this._router.navigate(['/App/RRF/RRFDashboard/Candidates/' + this.RRFID]);
    }
}
