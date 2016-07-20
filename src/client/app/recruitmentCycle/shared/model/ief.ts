import { MasterData } from  '../../../shared/model/index';
import { CandidateProfile } from  '../../../profileBank/shared/model/myProfilesInfo';
import { Interview, InterviewAvailability, IEFTransactionDetails } from  './Interview';

export class IEFDetails {
    public DetailRRFID: MasterData = new MasterData();
    public Location: string;
    public Function: string;
    public Roles: string;
    public CandidateDetails: CandidateProfile = new CandidateProfile();
    public InterviewDetails: Interview = new Interview();
    public Interviewers: InterviewAvailability = new InterviewAvailability();
    public IEFTransactionDetails: IEFTransactionDetails = new IEFTransactionDetails();
}

export class IEFFunction {
    FunctionLabel: string;
    Rating: number;
    FunctionValue: string;
    isLabel: boolean = true;
    isRating: boolean = true;
}

//Used to show candidate basic information 
export class IEFInformation {
    CandidateID: MasterData = new MasterData();
    RRFDetailsIEF: RRFDetailsIEF = new RRFDetailsIEF();
    Experience: Experience = new Experience();
    Salary: Salary = new Salary();
    Skills: Skills = new Skills();
    CandidateName: string;
    AdditionalInformation: string;
    Location: string;
    NoticePeriod: string;
}

export class RRFDetailsIEF {
    Role: string;
    Function: string;
}
export class Experience {
    TotalExperience: string;
    RelevantExperience: string;
}
export class Salary {
    Current: string;
    Expected: string;
}
export class Skills {
    PrimarySkills: string;
    SecondarySkills: string;
    OtherSkills: string;
}
export class iefModel {
    public RRFID: MasterData = new MasterData();
    public CandidateID: MasterData = new MasterData();
    public DisplayCandidateInfo: boolean = true;
    public InterviewType: MasterData = new MasterData();
    public InterviewID: MasterData = new MasterData();
}
export class IEFSubmission {
    RRFID: MasterData = new MasterData();
    CandidateID: MasterData = new MasterData();
    InterviewID: MasterData = new MasterData();
    Status: string;
    Comments: string;
    IEFTransactionDetails: Array<IEFFunction> = new Array<IEFFunction>();
}

