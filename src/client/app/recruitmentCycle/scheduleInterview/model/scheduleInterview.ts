import { MasterData } from  '../../../shared/model/index';

export class InterviewersPanel {
    public RoundNumber:MasterData = new MasterData();
    public Interviewers : Array<MasterData> = new Array<MasterData>();
}

export class Interviewers {
    public InterviewerId :  MasterData = new MasterData();
}