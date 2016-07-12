// import { MasterData } from  '../../../shared/model/index';
// import { CandidateProfile } from  '../../../ProfileBank/shared/model/myProfilesInfo';

// export class CalendarDetails {
//     public Event: string;
//     public Date: Date;
//     public StartTime: string;
//     public EndTime: string;
//     public Interviewer: MasterData = new MasterData();
//     public Status: string;
// }
export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    resourceId: string;
    allDay: boolean = true;
}
export class Resource {
    id: number;
    title: string;
    eventColor: string;
}
