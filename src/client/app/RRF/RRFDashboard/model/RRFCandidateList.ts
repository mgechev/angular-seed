import { MasterData  } from '../../../shared/model/common.model';
import { RRFDetails  } from '../../myRRF/models/rrfDetails';
import { CandidateProfile } from  '../../../ProfileBank/shared/model/myProfilesInfo';
import {InterviewAvailability} from '../../../Recruitment Cycle/Shared/Model/Interview';
export class RRFSpecificCandidateList {
    Candidate: CandidateProfile;
    AssignedRRF: RRFDetails;
    CandidateList: Array<CandidateProfile> = new Array<CandidateProfile>();
    //CandidateInterviewRoundHistory: Array<InterviewRoundHistory> = new Array<InterviewRoundHistory>();
}
// export class InterviewRoundHistory {
//     InterviewDate: Date;
//     InterviewerAvailability: InterviewAvailability = new InterviewAvailability();
//     Status: MasterData = new MasterData();
//     Round: MasterData = new MasterData();
//     Comments: string;
//     CandidateID:  MasterData = new MasterData();
//     RRFID:  MasterData = new MasterData();
// }
