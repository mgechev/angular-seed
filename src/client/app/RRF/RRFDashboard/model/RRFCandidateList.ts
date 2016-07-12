import { MasterData  } from '../../../shared/model/common.model';
import { RRFDetails  } from '../../myRRF/models/rrfDetails';
import { CandidateProfile } from  '../../../ProfileBank/shared/model/myProfilesInfo';
export class RRFSpecificCandidateList {
    Candidate: CandidateProfile;
    AssignedRRF: RRFDetails;
    CandidateList: Array<CandidateProfile> = new Array<CandidateProfile>();
    CandidateInterviewRoundHistory: Array<InterviewRoundHistory> = new Array<InterviewRoundHistory>();
}
export class InterviewRoundHistory {
    InterviewDate: Date;
    Interviewer: MasterData = new MasterData();
    Status: MasterData = new MasterData();
    Round: MasterData = new MasterData();
    Comments: string;
    CandidateID: string;
    RRFID: string;
}
