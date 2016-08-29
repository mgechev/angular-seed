// import { MasterData  } from '../../../shared/model/common.model';
// import { RRFDetails  } from '../../myRRF/models/rrfDetails';
import { CandidateProfile } from  '../../../profileBank/shared/model/myProfilesInfo';
import {Interview} from '../../../recruitmentCycle/shared/model/interview';


export class RRFSpecificCandidateList {
    Candidate: CandidateProfile;
    CandidateList: Array<CandidateProfile> = new Array<CandidateProfile>();
    InterviewDetails: Interview = new Interview();
    isInterviewScheduled: boolean = false;
    isAwaitingApproval: boolean = false;
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
