// import { MasterData } from  '../../../shared/model/index';
// import { CandidateProfile } from  '../../../ProfileBank/shared/model/myProfilesInfo';

export class CalendarDetails {
    public Events: Array<Event> = new Array<Event>();
    public Resources: Array<Resource> = new Array<Resource>();
    public InterviewCalendarID: string;
    public RRFID: string;
}
export class Event {
    id: number;
    title: string;
    start: string;
    end: string;
    resourceId: any;
    Resource:string;
   // allDay: boolean = true;
}
export class Resource {
    id: number;
    title: string;
    eventColor: string;
}
