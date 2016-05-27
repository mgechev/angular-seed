export class Panel {
    public RoundNumber: MasterData = new MasterData(); //TODO : check on server side name
    public Interviewers: MasterData[] = new Array();
    public Comments: string;
}

export class AssignmentDetails {
    public RRFID: number;
    public AssignedTo: MasterData = new MasterData();
    public AssignedComments: string;
    public AssignedDate: Date;
    public UnassigningComment: string;
    public AssigneeLastDate: Date;
}

export class RRFDetails {
    public RRFID: number;
    public Practice: MasterData = new MasterData();
    public Technology: MasterData = new MasterData();
    public PositionTitle: string;
    public Description: string;
    public NoOfOpenings: number = 1;
    public SkillsRequired: MasterData[] = new Array();
    public Designation: MasterData = new MasterData();
    public MinExp: number = 0;
    public MaxExp: number = 0;
    public Priority: number = 1;
    public ExpDateOfJoining: Date;
    public RaisedBy: string;
    public Status: string;
    public Panel: Panel[] = new Array();

    public IsChecked: boolean;
    public Comment: string;
    public AssignedData: AssignmentDetails[] = [];
}

export class MasterData {
    public Id: number;
    public Value: string;
}

export class AllRRFStatusCount {
    public PendingApproval: number;
    public Rejected: number;
    public Open: number;
    public Assigned: number;
    public InProgress: number;
    public ClosureApproval: number;
    public Closed: number;
    public OnHold: number;
}
