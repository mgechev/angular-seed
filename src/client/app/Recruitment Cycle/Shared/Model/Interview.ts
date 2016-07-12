import { MasterData } from  '../../../shared/model/index';
import { DetailRRF } from  './detailRRF';

//Interview master
export class Interview {
    public detailsRRF: DetailRRF= new DetailRRF();
    public CandidateID: MasterData = new MasterData();
    public CANDIDATECODE: string;
    public InterviewID: string;//MasterData = new MasterData();
    public InterviewDate: string;
    public InterviewFromTime: string;
    public InterviewToTime: string;
    public InterviewType: MasterData = new MasterData();
    public InterviewMode: MasterData = new MasterData();
    public InterviewRound: MasterData = new MasterData();
    public DisplayCandidateInfo: boolean;
    public Status: string;
    public Comments: string;
    public ProceedOfferGeneration: boolean;
    public RRFID: MasterData = new MasterData();
    public RRFCODE: string;
    public Round: MasterData = new MasterData();
    public InterviewAvailabilityComments: InterviewAvailability = new InterviewAvailability();
    public CandidatePrimaryDetails: CandidatePrimaryDetails = new CandidatePrimaryDetails();
    public Interviewer: Array<MasterData> = new Array<MasterData>();
    public IEFTransactionDetails: Array<IEFTransactionDetails> = new Array<IEFTransactionDetails>();
}
//Interviewrs Availability comments
export class InterviewAvailability {
    public ID: number;
    public Interviewer: MasterData = new MasterData();;
    public ConfirmationStatus: string;
    public Comments: string;
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
