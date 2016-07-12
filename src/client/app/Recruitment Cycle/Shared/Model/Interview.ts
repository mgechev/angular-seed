import { MasterData } from  '../../../shared/model/index';

//Interview master
export class Interview {
    public CandidateID: string;
    public InterviewID: number;
    public InterviewDate: string;
    public InterviewFromTime: string;
    public InterviewToTime: string;
    public InterviewType: MasterData = new MasterData();
    public InterviewMode: MasterData = new MasterData();
    public InterviewRound: MasterData = new MasterData();
    public DisplayCandidateInfo: boolean;
    public Status: MasterData = new MasterData();
    public Comments: string;
    public ProceedOfferGeneration: string;
    public RRFID: string;
    public InterviewAvailabilityComments: InterviewAvailability = new InterviewAvailability();
    public CandidateInformation: CandidateDetails = new CandidateDetails();
    public Interviewer: Array<MasterData> = new Array<MasterData>();
}
//Interviewrs Availability comments
export class InterviewAvailability {
    public ID: number;
    public Interviewer: number;
    public ConfirmationStatus: number;
    public Comments: number;
}
//Candidate primary information for interviewers
export class CandidateDetails {
    public CandidateID: string;
    public FirstName: string;
    public LastName: string;
    public Candidate: string; // Candidate =>Full Name
    public Email: string;
    public Tag: string;
    public ResumeID: string;
    public Contact: string;
}
