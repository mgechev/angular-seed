import { MasterData  } from '../../../../../shared/model/common.model';

export class CalenderSlot {
    public ID :number;
    public RRFID: MasterData = new MasterData();
    public InterviewCalendarID :  MasterData = new MasterData();
    public Title: string;
    public StartDate: Date;
    public EndDate: Date;
    public CalendarDetails: CalenderDetails[] = [];
}

export class CalenderDetails {
    public ID: string;
    CalendarDate: Date;
    StartTime: string;
    EndTime: string;
    Status: string;
}

