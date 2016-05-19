import {GridOptions} from './gridOptions';

export class GridMeta {
    constructor(
        public headerTitle: Array<string>,
        public properties:  Array<string>,
        public dataList: Array<any>,
        public itemActions:  Array<any>,
        public searchCallback: Function,
        public gridOptions: GridOptions,
        public rowClickCallback: Function
    ) { }
}
