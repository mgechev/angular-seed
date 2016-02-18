import { Component, Input, OnInit, OnChanges } from 'angular2/core';
import {Store} from '../../../store/store';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {AssignmentsService} from '../../shared/services/assignments.service';

@Component({
  selector: 'assignments-component',
  directives: [AgGridNg2],
  bindings: [AssignmentsService],
  template: `
    <section>
      <h2>Roles and Rights</h2>
      <p>users.state: {{ users.state }}</p>
      <p>assignments.state: {{ assignments.state }}</p>
      <section>
        <ag-grid-ng2 #agGrid class="ag-fresh" style="width: 100%; height: 350px;"
            [gridOptions]="gridOptions"
            [columnDefs]="columnDefs"
            [showToolPanel]="showToolPanel"
            [rowData]="rowDataUsers"
            enableColResize
            enableSorting
            enableFilter
            rowsAlreadyGrouped
            rowSelection="multiple"
            (modelUpdated)="onModelUpdated()"
            (cellClicked)="onCellClicked($event)"
            (cellDoubleClicked)="onCellDoubleClicked($event)"></ag-grid-ng2>
      </section>
    </section>
  `
})

export class AssignmentsComponent implements OnInit, OnChanges {

  @Input() assignments;
  @Input() users;

  constructor(private service: AssignmentsService, private store: Store) {}

  columnDefs;
  rowDataUsers;

  ngOnInit() {
    this.service.fetchUsergroupsUsersRelation();
  }

  ngOnChanges(changes) {

    if(changes.assignments) { // map 'assignments' data from store to ag-grid data
      let updatedUserAssignments = changes.assignments.currentValue.usergroupsUsersRelation;
      if(!updatedUserAssignments) return;

      let mappedUserGroups = updatedUserAssignments.map((usergroup, index) => {
        return {headerName: usergroup.group.name, field: 'cell'+ index, width: usergroup.group.name.length*7+50};
      });
      mappedUserGroups.unshift(
        {
          headerName: '', field: 'name', width: 250,
          cellRenderer: {
            renderer: 'group'
          }
        });

      this.columnDefs = mappedUserGroups;
    }

    if(changes.users) { // map 'users' data from store to ag-grid data
      let users = changes.users.currentValue.usersList;
      let mappedData = users.map(user => {
        return {group: false, data: {
          name: user['firstname'] +' '+ user['lastname'], cell0: 'X', cell1: 'X', cell2: '0', cell3: '0'
          , cell4: 'X', cell5: 'X', cell6: 'X', cell7: 'X', cell8: 'X', cell9: 'X', cell10: 'X', cell11: 'X', cell12: 'X'}
        };
      });
      this.rowDataUsers = mappedData;
    }
  }

  // delegated events from ag-grid:
  onModelUpdated() {
    console.log('ag-grid: module updated');
  }

  onCellClicked(event) {
    console.log('ag-grid: cell clicked');
    console.log(event);
  }

  onCellDoubleClicked(event) {
    console.log('ag-grid: cell double clicked');
    console.log(event);
  }

}
