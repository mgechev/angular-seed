import { MasterData } from  '../../../shared/model/index';
import { CalenderDetails} from '../../../recruitmentCycle/shared/Component/InterviewSlot/Model/interviewSlot';
export class PanelAvailability {
    public Interviewer: MasterData = new MasterData();
    public AvailabilityDetails : Array<CalenderDetails> = new Array<CalenderDetails>();
}
