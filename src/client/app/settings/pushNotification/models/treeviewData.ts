import { MasterData} from '../../../shared/model/common.model';
export class TreeviewNode {
    public name: string;
    public checked: boolean = false;
    public description: string = '';
    public type: MasterData = new MasterData();
}

export class TreeviewData {
    public mainNodeChecked: boolean;
    public mainNodeName: string;
    public nodes: TreeviewNode[] = [];
}
