import { MasterData } from  '../../../shared/model/index';
import { RRFDetails } from  '../../../RRF/myRRF/index';
export class AssignRRFDetails {
    AssignedRRF: Array<RRFDetails> = new Array<RRFDetails>();
    CandidateIDs: Array<string>;
    Comments: string;
    RRFID: MasterData=new MasterData();
    CandidateName: string;
    Candidates: Array<Candidate> = new Array<Candidate>();
    //CandidateCode:string;
}
export class Candidate {
    public CandidateID: MasterData = new MasterData();
    public Candidate: string ;
}
