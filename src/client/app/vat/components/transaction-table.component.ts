import {Component, Input} from "@angular/core";
import {CostCharacter} from "../../shared/services/import-list.service";

@Component({
  moduleId: module.id,
  selector: 'transaction-table',
  templateUrl: 'transaction-table.component.html'
})
export class TransactionTableComponent {
  @Input() rows:Array<any> = [];
  @Input() data:Array<any>;
  @Input() length:number = 0;

  public columns:Array<any> = [
    {title: 'Datum', name: 'dateFormatted'},
    {title: 'Bedrag', name: 'amount'},
    {title: 'Bedrag Netto', name: 'amountNet'},
    {title: 'btw', name: 'amountVat'},
    {title: 'Omschrijving', name: 'description'},
    {title: 'Type', name: 'costTypeDescription'},
    {title: 'Zakelijk/Prive', name: 'costCharacterDescription', sort: 'asc'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns, sortType: 'alphabetic'},
    filtering: {filterString: '', columnName: 'description', onlyUnknown: false}
  };

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '') {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (this.config.sorting.sortType === 'alphabetic') {
        if (previous[columnName] > current[columnName]) {
          return sort === 'desc' ? -1 : 1;
        } else if (previous[columnName] < current[columnName]) {
          return sort === 'asc' ? -1 : 1;
        }
        return 0;
      }
    });
  }

  public changeFilter(data:any, config:any):any {
    if (!config.filtering) {
      return data;
    }

    let filteredData:Array<any> = data.filter((item:any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString)
      && (!config.filtering.onlyUnknown || item.costCharacter === CostCharacter.UNKNOWN)
    );
    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.length = this.data.length;
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
  }
}
