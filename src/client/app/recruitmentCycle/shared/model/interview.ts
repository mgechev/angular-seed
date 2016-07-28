import { MasterData } from  '../../../shared/model/index';
import { DetailRRF } from  './detailRRF';
import { IEFFunction } from  './ief';

//Interview master
export class Interview {
    public detailsRRF: DetailRRF = new DetailRRF();
    public CandidateID: MasterData = new MasterData();
    public Candidate: string;
    public CandidateStatus: MasterData = new MasterData();
    public CANDIDATECODE: string;
    public InterviewID: MasterData = new MasterData();
    public InterviewDate: string;
    public InterviewFromTime: string;
    public InterviewToTime: string;
    public InterviewType: MasterData = new MasterData();
    public InterviewMode: MasterData = new MasterData();
    public InterviewRound: MasterData = new MasterData();
    public DisplayCandidateInfo: boolean;
    public Status: string = '';
    public Comments: string;
    public ProceedOfferGeneration: boolean;
    public RRFID: MasterData = new MasterData();
    public RRFCODE: string;
    public Round: MasterData = new MasterData();
    public InterviewAvailabilityComments: InterviewAvailability = new InterviewAvailability();
    public InterviewerAvailability: Array<InterviewAvailability> = new Array<InterviewAvailability>();
    public CandidatePrimaryDetails: CandidatePrimaryDetails = new CandidatePrimaryDetails();
    public Interviewer: Array<MasterData> = new Array<MasterData>();
    public IEFTransactionDetails: Array<IEFFunction> = new Array<IEFFunction>();
    public ApprovalType: string;
    public ApproverComments: string;
    public Reason: string;
    public Approver: string;
    public CandidateDetails: CandidatePrimaryDetails = new CandidatePrimaryDetails();
}
//Interviewrs Availability comments
export class InterviewAvailability {
    public ID: number;
    public Interviewer: MasterData = new MasterData();
    public InterviewerConfirmation: string;
    public AvailabilityComments: string;
}
//Candidate primary information for interviewers
export class CandidatePrimaryDetails {
    public CandidateID: MasterData = new MasterData();
    public FirstName: string;
    public MiddleName: string;
    public LastName: string;
    public FullName: string;
    public Email: string;
    public Tag: string;
    public ResumeID: string;
    public Contact: string;
}

export class IEFTransactionDetails {
    public IEFID: string;
    public InterviewID: MasterData = new MasterData();;
    public Ratings: string;
    public Remarks: string;
    public FunctionName: MasterData = new MasterData();
}
export class AwaitedInterview {
    public InterviewID: MasterData = new MasterData();
    public Interviewer: MasterData = new MasterData();
    public InterviewConfirmation: string;
    public AvailabilityComments: string;
}
