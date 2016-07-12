import { MasterData } from  '../../../shared/model/index';

//Interview master
export class Interview {
    public CandidateId: string;
    public InterviewId: number;
    public Date: string;
    public FromTime: string;
    public ToTime: string;
    public Type: MasterData = new MasterData();
    public Mode: MasterData = new MasterData();
    public Round: MasterData = new MasterData();
    public DisplayCandidateInfo: boolean;
    public Status: string;
    public Comments: string;
    public ProceedOfferGeneration: string;
    public InterviewAvailabilityComments: InterviewAvailability = new InterviewAvailability();
    public CandidateInformation: CandidateDetails = new CandidateDetails();
}
//Interviewrs Availability comments
export class InterviewAvailability {
    public Id: number;
    public Interviewer: number;
    public ConfirmationStatus: number;
    public Comments: number;
}
//Candidate primary information for interviewers
export class CandidateDetails {
    public CandidateID: string;
    public FirstName: string;
    public LastName: string;
    public FullName: string;
    public Email: string;
    public Tag: string;
    public ResumeId: string;
    public Contact: string;
}
