import { MasterData } from  '../../../shared/model/index';
import { CandidateProfile } from  '../../../profileBank/shared/model/myProfilesInfo';
import { Interview,InterviewAvailability,IEFTransactionDetails } from  './Interview';

export class IEFDetails {
    public DetailRRFID: MasterData = new MasterData();
    public RRFCODE: string;
    public CandidateDetails : CandidateProfile = new CandidateProfile();
    public InterviewDetails : Interview = new Interview();
    public Interviewers : InterviewAvailability = new InterviewAvailability();
    public IEFTransactionDetails : IEFTransactionDetails = new IEFTransactionDetails();
}
