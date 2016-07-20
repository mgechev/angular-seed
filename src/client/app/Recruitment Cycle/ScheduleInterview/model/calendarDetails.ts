 import { MasterData } from  '../../../shared/model/index';
// import { CandidateProfile } from  '../../../ProfileBank/shared/model/myProfilesInfo';

export class CalendarDetails {
    public Events: Array<Event> = new Array<Event>();
    public Resources: Array<Resource> = new Array<Resource>();
    public InterviewCalendarID: string;
    public RRFID: string;
}
export class Event {
    public id: number;
    public title: string;
    public start: string;
    public end: string;
    public resourceId: any;
    public Resource:string;
    public InterviewID : MasterData = new MasterData();
   // allDay: boolean = true;
}
export class Resource {
    id: number;
    title: string;
    eventColor: string;
}
