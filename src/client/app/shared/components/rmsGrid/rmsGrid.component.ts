import {Component, Input} from '@angular/core';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {GridMeta} from './models/gridMeta';

@Component({
    moduleId: module.id,
    selector: 'rms-grid',
    templateUrl: 'rmsGrid.component.html',
    directives: [PAGINATION_DIRECTIVES]
})

export class RMSGridComponent {
    @Input() meta: GridMeta;
    sortType: string;
    sortReverse: boolean = false;
    public maxSize: number = 5;

    public pageChanged(event: any): void {
        this.meta.gridOptions.currentPage = event.page;
        this.meta.searchCallback();
    };

    onRowClick(event: any, item: any) {
        if (event.target.type === 'button' || event.target.tagName === 'A') {
            event.preventDefault();
        } else
            this.meta.rowClickCallback(item);
    }

    onSearch(searchString: string) {
        this.meta.gridOptions.currentPage = 1;
        this.meta.gridOptions.searchString = searchString;
        this.meta.searchCallback();
    }

    isSortable(columnName: string) {
        return false;
    }

    isSortedBy(columnName: string) {
        this.sortType = columnName;
        let sortDir = this.sortReverse === true ? 'DESC' : 'ASC';
        this.sortReverse = !this.sortReverse;
        this.meta.gridOptions.currentPage = 1;
        this.meta.gridOptions.orderBy = sortDir;
        this.meta.gridOptions.orderColumn = columnName;
        this.meta.searchCallback();
    }
}
