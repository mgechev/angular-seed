import {Component} from 'angular2/core';
import {Store} from '../../../store/store';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Dropdown} from '../../ui-elements/form-elements/dropdown';
import {backendUrlSelected} from './backend.actions';

@Component({
  selector: 'backend-chooser',
  directives: [DROPDOWN_DIRECTIVES, Dropdown],

  template: `
     <dropdown
        [options]="store.getFeatureStore('backend').backendUrls ? store.getFeatureStore('backend').backendUrls : null"
        [defaultOption]="store.getFeatureStore('backend').backendUrl"
        [label]="'Backend URL'"
        [noDataMessage]="'No backend systems available'"
        [emptyOptionsMessage]="'No backend systems available'"
        (optionSelected)="onBackendSelected($event)"></dropdown>
  `
})
export class BackendChooserComponent {

  constructor(private store:Store) {
  }

  public onBackendSelected(backendUrl:string) {
    this.store.dispatch(backendUrlSelected(backendUrl));
  }
}
