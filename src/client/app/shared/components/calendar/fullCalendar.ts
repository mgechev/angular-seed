import {Component, Input, Output, OnDestroy, DoCheck, IterableDiffers,
    AfterViewInit, ViewChild, EventEmitter, ElementRef} from '@angular/core';
//import { ROUTER_DIRECTIVES, } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'full-calendar',
    templateUrl: 'fullCalendar.html'
})

export class FullCalendarComponent implements AfterViewInit, OnDestroy, DoCheck {
    @Input() events: any[];

    @Input() resources: any[];

    @Input() header: any;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() rtl: boolean;

    @Input() weekends: boolean;

    @Input() hiddenDays: number[];

    @Input() fixedWeekCount: boolean;

    @Input() weekNumbers: boolean;

    @Input() businessHours: any;

    @Input() height: any;

    @Input() contentHeight: any;

    @Input() aspectRatio: number = 1.35;

    @Input() eventLimit: any;

    @Input() defaultDate: any;

    @Input() editable: boolean;

    @Input() eventStartEditable: boolean;

    @Input() eventDurationEditable: boolean;

    @Input() defaultView: string = 'month';

    @Input() allDaySlot: boolean = true;

    @Input() slotDuration: any = '00:30:00';

    @Input() slotLabelInterval: any;

    @Input() snapDuration: any;

    @Input() scrollTime: any = '06:00:00';

    @Input() minTime: any = '00:00:00';

    @Input() maxTime: any = '24:00:00';

    @Input() slotEventOverlap: boolean = true;

    @Input() nowIndicator: boolean;

    @Input() dragRevertDuration: number = 500;

    @Input() dragOpacity: number = .75;

    @Input() dragScroll: boolean = true;

    @Input() eventOverlap: any;

    @Input() eventConstraint: any;

    @Input() locale: any;

    @Output() onDayClick: EventEmitter<any> = new EventEmitter();

    @Output() onEventClick: EventEmitter<any> = new EventEmitter();

    @Output() onEventMouseover: EventEmitter<any> = new EventEmitter();

    @Output() onEventMouseout: EventEmitter<any> = new EventEmitter();

    @Output() onEventDragStart: EventEmitter<any> = new EventEmitter();

    @Output() onEventDragStop: EventEmitter<any> = new EventEmitter();

    @Output() onEventDrop: EventEmitter<any> = new EventEmitter();

    @Output() onEventResizeStart: EventEmitter<any> = new EventEmitter();

    @Output() onEventResizeStop: EventEmitter<any> = new EventEmitter();

    @Output() onEventResize: EventEmitter<any> = new EventEmitter();

    @Output() viewRender: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    stopNgOnChangesPropagation: boolean;

    differ: any;

    schedule: any;

    // @Input() FullCalendarConfiguration: Object;
    // @Input() FullCalendarClass: string;
    @Output() onCalendarReady = new EventEmitter<any>();

    @ViewChild('FullCalendar') private _selector: ElementRef;


    constructor(private el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.schedule = $(this._selector.nativeElement);
        let options = {
            theme: true,
            header: this.header,
            isRTL: this.rtl,
            weekends: this.weekends,
            hiddenDays: this.hiddenDays,
            fixedWeekCount: this.fixedWeekCount,
            weekNumbers: this.weekNumbers,
            businessHours: this.businessHours,
            height: this.height,
            contentHeight: this.contentHeight,
            aspectRatio: this.aspectRatio,
            eventLimit: this.eventLimit,
            defaultDate: this.defaultDate,
            editable: this.editable,
            eventStartEditable: this.eventStartEditable,
            eventDurationEditable: this.eventDurationEditable,
            defaultView: this.defaultView,
            allDayslot: this.allDaySlot,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotLabelInterval,
            snapDuration: this.snapDuration,
            scrollTime: this.scrollTime,
            minTime: this.minTime,
            maxTime: this.maxTime,
            slotEventOverlap: this.slotEventOverlap,
            nowIndicator: this.nowIndicator,
            dragRevertDuration: this.dragRevertDuration,
            dragOpacity: this.dragOpacity,
            dragScroll: this.dragScroll,
            eventOverlap: this.eventOverlap,
            eventConstraint: this.eventConstraint,
            resources: this.resources,
            events: (start: any, end: any, timezone: any, callback: any) => {
                callback(this.events);
            },
            dayClick: (date: any, jsEvent: any, view: any) => {
                this.onDayClick.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventClick: (calEvent: any, jsEvent: any, view: any) => {
                this.onEventClick.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseover: (calEvent: any, jsEvent: any, view: any) => {
                this.onEventMouseover.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseout: (calEvent: any, jsEvent: any, view: any) => {
                this.onEventMouseout.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStart: (calEvent: any, jsEvent: any, ui: any, view: any) => {
                this.onEventDragStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStop: (calEvent: any, jsEvent: any, ui: any, view: any) => {
                this.onEventDragStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDrop: (event: any, delta: any, revertFunc: any, jsEvent: any, ui: any, view: any) => {
                this.onEventDrop.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStart: (event: any, jsEvent: any, ui: any, view: any) => {
                this.onEventResizeStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStop: (event: any, jsEvent: any, ui: any, view: any) => {
                this.onEventResizeStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResize: (event: any, delta: any, revertFunc: any, jsEvent: any, ui: any, view: any) => {
                this.onEventResize.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            viewRender: (view: any, element: any) => {
                this.viewRender.emit({
                    'view': view,
                    'element': element
                });
            }
        };

        if (this.locale) {
            for (var prop in this.locale) {
                options[prop] = this.locale[prop];
            }
        }
        //$(this._selector.nativeElement).fullCalendar(options);
        this.schedule.fullCalendar(options);
        this.onCalendarReady.emit(this.schedule);
        this.initialized = true;
    }


    ngDoCheck() {
        let changes = this.differ.diff(this.events);
        if (this.schedule && changes) {
            this.schedule.fullCalendar('refetchEvents');
        }
    }

    ngOnDestroy() {
        $(this._selector.nativeElement).fullCalendar('destroy');
        this.initialized = false;
        this.schedule = null;
    }

    gotoDate(date: any) {
        this.schedule.fullCalendar('gotoDate', date);
    }

    prev() {
        this.schedule.fullCalendar('prev');
    }

    next() {
        this.schedule.fullCalendar('next');
    }

    prevYear() {
        this.schedule.fullCalendar('prevYear');
    }

    nextYear() {
        this.schedule.fullCalendar('nextYear');
    }

    today() {
        this.schedule.fullCalendar('today');
    }

    incrementDate(duration: any) {
        this.schedule.fullCalendar('incrementDate', duration);
    }

    getDate() {
        return this.schedule.fullCalendar('getDate');
    }
}
