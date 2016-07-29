import { Interview} from '../../shared/model/interview';
import { GrdOptions, MasterData } from  '../../../shared/model/index';

export class InterviewsList {
    public AllInterviews: Array<Interview> = new Array<Interview>();
    public CandidateRRFIDs : CandidateRRFID = new CandidateRRFID();
    public GrdOperations = new GrdOptions();
}
export class CandidateRRFID {
  public RRFID: MasterData = new MasterData();
}
