import { MasterData } from  '../../../shared/model/index';
export class TODOList {
    public ID: string;
    public Title: string;
    public Owner:MasterData = new MasterData();
}
