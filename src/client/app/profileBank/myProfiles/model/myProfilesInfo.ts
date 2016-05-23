
export class Masters {
  public Id: number;
  public Value: string;
}
export class Qualification {
  public CandidateID: number;
  public QualificationID: number;
  public Qualification: Masters;
  public YearOfPassing: Masters;
  public Marks: number;
  public Grade: Masters;
  public CurrentQualification: number;
  public CurrentYear: number;
  public CurrentGrade: number;
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
  public Status: Masters;
  public Comments: string;
  public CandidateOtherDetails: any;
  public CandidateSalaryDetails: any;

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
  public IsCurrentSameAsPermanent: any;

  //properties of Qualification
  public Qualifications: Array<Qualification>;

  //properties of Candidate Skills
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

  //properties of Candidate Career Profile
  public TotalExperience: number;
  public RelevantExperience: number;
  public CurrentCompany: string;
  public CurrentDesignationRole: string;
  public TimeSpentInCurrentCompany: number;

  //properties of Candidate Salary Structure
  public CurrentSalary: number;
  public ExpectedSalary: string;
  public CurrentTakeHome: number;
  public AnyPerks: string;
  public CTCIncludeVariable: any;
  public HowMuchVariable: number;

  //properties of Candidate Team Management
  public TeamMgmt: any;
  public HandlingTeam: number;
  public NoOfTeamMembers: number;
  public TeamMembersDesignations: string;
  public TeamHandlingChallenges: string;

  //Properties of Professional Details
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

