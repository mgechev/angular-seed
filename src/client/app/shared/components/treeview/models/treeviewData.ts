export class TreeviewNode {
    public name: string;
    public checked: boolean = false;
    public description: string = '';
}

export class TreeviewData {
    public mainNodeChecked: boolean;
    public mainNodeName: string;
    public nodes: TreeviewNode[] = [];
}
