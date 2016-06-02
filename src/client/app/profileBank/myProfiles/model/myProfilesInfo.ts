import { MasterData } from  '../../../shared/model/index';
export class Qualification {
  public CandidateID: number;
  public QualificationID: number;
  public Qualification: any;
  public YearOfPassing: any;
  public Marks: number;
  public Grade: any;
}

export class MyProfilesInfo {
  public CandidateID: number;
  public Candidate: string;
  public FirstName: string;
  public MiddleName: string;
  public LastName: string;
  public PrimaryContact: number;
  public Email: string;
  public Tag: string;
  public Skills: Array<string>;
  public ResumeID: number;
  public Status = new MasterData();
  public Comments: string;
  public CandidateOtherDetail = new OtherDetails();
  public CandidateSalaryDetails = new SalaryDetails();
  public CandidateSkills = new Skills();

  //Properties of Personal Information
  public SecondaryContact: number;
  public District: number;
  public State: number;
  public Country: number;
  public PermanentAddress: string;
  public CurrentAddress: string;
  public PANNumber: string;
  public PassportNumber: string;
  public OutstationedCandidate: any;
  public ReadyToRelocate: any;
  public CommentsAdditionalInformation: string;
  public ResumeSource: string;
  public ReasonToRelocate: string;
  public FriendsRelatives: string;
  public IsCurrentSameAsPermanent: any;

  //properties of Qualification
  public Qualifications: Array<Qualification>;

  //properties of Candidate Career Profile
  public TotalExperience: number;
  public RelevantExperience: number;
  public CurrentCompany: string;
  public CurrentDesignationRole: string;
  public TimeSpentInCurrentCompany: number;

  //properties of Candidate Team Management
  public TeamMgmt: any;
  public HandlingTeam: number;
  public NoOfTeamMembers: number;
  public TeamMembersDesignations: string;
  public TeamHandlingChallenges: string;
    public IsChecked: boolean;
}

export class Skills {
  public ExpInSkill: number;
  public AnyFunctionalExp: string;
  public PrimarySkills: string;
  public SecondarySkills: string;
  public OtherSkills: string;
  public RoleAndResponsibility: string;
  public ProjectsDone: string;
  public UnitIntegressionRegressionTesting: string;
  public Database: string;
  public OtherTechnology: string;
  public AwareAboutTesting: string;
  public StrongTechnicalSkills: string;
}

export class SalaryDetails {
  public CurrentSalary: number;
  public ExpectedSalary: string;
  public CurrentTakeHome: number;
  public AnyPerks: string;
  public CTCIncludeVariable: any;
  public HowMuchVariable: number;
}

export class OtherDetails {
  public AppliedEarlier: any;
  public AppraisalBondContractDetails: string;
  public Visa: string;
  public NoticePeriod: string;
  public RoleExpected: string;
  public ResignedStatusOfOfferedCandidate: string;
  public JobSerachPeriod: string;
  public FamilyBackground: string;
  public Strengths: string;
  public Weekness: string;
  public IfExstingCompanyOffers: string;
  public NoticePeriodNotCompletedCount: string;
  public LookingFor: string;
  public OfferInHand: any;
  public OfferDetails: string;
  public PrimaryReasonToQuitLastJob: string;
  public SecondaryReasonToQuitLastJob: string;
  public PrimaryReasonToQuitCurrentJob: string;
  public SecondaryReasonToQuitCurrentJob: string;


}
export class ResumeMeta {
  public Profile: any;
  public CandidateLookupId: string;
  public Overwrite: boolean;
}

export class AddCandidateResponse {
  public StatusCode: number;
  public Message: '';
  public ReasonCode: string;
  public ErrorMsg: string;
  public candidateLookupId: string;
}


