import { Interview} from '../../shared/model/interview';
import { GrdOptions, MasterData } from  '../../../shared/model/index';

export class InterviewsList {
  public AllInterviews: Array<Interview> = new Array<Interview>();
  public CandidateRRFIDs: CandidateRRFID = new CandidateRRFID();
  // public GrdOperations:grdOperations = new grdOperations();
  public GrdOperations: GrdOptions = new GrdOptions();
}

export class ReScheduleInterviewsList {
  public AllInterviews: Array<Interview> = new Array<Interview>();
  public CandidateRRFIDs: CandidateRRFID = new CandidateRRFID();
  public GrdOperations: GrdOperations = new GrdOperations();

}
export class CandidateRRFID {
  public RRFID: MasterData = new MasterData();
}

export class GrdOperations {
  public GrdOperations: GrdOptions = new GrdOptions();
}
