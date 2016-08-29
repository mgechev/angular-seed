import { MasterData } from  '../../../shared/model/index';

export class PanelAvailability {
    public Interviewer: MasterData = new MasterData();
    public AvailabilityData: Array<AvailabilitySlot> = new Array<AvailabilitySlot>();
}

export class AvailabilitySlot {
    public StartDate: Date;
    public EndDate: Date;
    public StartTime: string;
    public EndTime: string;
}