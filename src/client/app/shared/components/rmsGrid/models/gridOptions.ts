export class GridOptions {
    constructor(
        public totalItems: number,
        public itemPerPage: number,
        public currentPage: number,
        public searchString: string,
        public orderBy: string,
        public orderColumn: string
    ) { }
}