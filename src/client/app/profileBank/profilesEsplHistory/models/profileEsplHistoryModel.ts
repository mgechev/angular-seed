import { RRFDetails  } from '../../../RRF/myRRF/models/rrfDetails';
//import {CandidateProfile, AllCandidateProfiles} from '../../shared/model/myProfilesInfo';
//import { IEFFunction} from '../../../recruitmentCycle/shared/model/ief';
import { Interview} from '../../../recruitmentCycle/shared/model/interview';
import { GrdOptions } from  '../../../shared/model/index';

export class ProfileInterviewHistory {
    public RrfDetails: RRFDetails = new RRFDetails();
    public InterviewDetails: Interview = new Interview();
}
export class AllInterviewsHistory {
    public GrdOperations = new GrdOptions();
    public ProfileInterviewHistory: Array<ProfileInterviewHistory> = new Array<ProfileInterviewHistory>();
}

