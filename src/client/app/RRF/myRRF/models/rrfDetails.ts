import { MasterData  } from '../../../shared/model/common.model';

export class Panel {
    public RoundNumber: MasterData = new MasterData(); //TODO : check on server side name
    public Interviewers: MasterData[] = new Array();
   // public Comments: string; //As per requirement
}

export class AssignmentDetails {
    public RRFID: number;
    public AssignedTo: MasterData = new MasterData();
    public AssignedComments: string;
    public AssignedDate: Date;
    public UnassigningComment: string;
    public Status: MasterData = new MasterData();
    public AssigneeLastDate: Date;
}

export class AllRRFStatusCount {
    public Count : number;
    public Status : MasterData = new MasterData();
}



export class RRFApproval {
    Approver: MasterData = new MasterData();
    Status: string;
    Comments: string;
}

export class RRFDetails {
    public RRFID: string;
    public Practice: MasterData = new MasterData();
    public Technology: MasterData = new MasterData();
    public PositionTitle: string;
    public Description: string;
    public NoOfOpenings: number = 1;
    public SkillsRequired= new Array<MasterData>();
    public Designation: MasterData = new MasterData();
    public MinExp: number = 0;
    public MaxExp: number = 0;
    public Priority: MasterData = new MasterData();
    public ExpDateOfJoining: Date;
    public RaisedBy: MasterData = new MasterData();
    public Status: MasterData = new MasterData();
    public Panel: Panel[] = new Array();

    public IsChecked: boolean;
    public Comment: string;
    public AssignedData: AssignmentDetails[] = [];
    public RRFApproval: RRFApproval[] = new Array();
    public OpenForNumberOfDays: number = 0;
    public CreatedDate : Date;
}

// export class ResultForAPI {
//    public StatusCode : number;
//    public Message : '' ;
//     public ReasonCode: string;
//    public ErrorMsg: string;
// }

// export class MasterData {
//     public Id: number;
//     public Value: string;
// }

