import {Component} from 'angular2/core';
import {Store} from '../../../store/store';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Dropdown} from '../../ui-elements/form-elements/dropdown';
import {AuthenticationActions} from '../authentication/authentication.actions';
import {OnInit} from 'angular2/core';
import {BackendActions} from './backend.actions';

@Component({
  selector: 'backend-chooser',
  directives: [DROPDOWN_DIRECTIVES, Dropdown],

  template: `
    <form class="p-y-1">
      <dropdown
        [options]="store.getFeatureStore('backend').backendUrls ? store.getFeatureStore('backend').backendUrls : null"
        [defaultOption]="store.getFeatureStore('backend').backendUrl"
        [label]="'Backend URL'"
        [noDataMessage]="'No backend systems available'"
        [emptyOptionsMessage]="'No backend systems available'"
        (optionSelected)="onBackendSelected($event)"></dropdown>
      <button type="submit" class="btn btn-primary" (click)="onBackendUrlCommit()">Select
      </button>
    </form>
  `
})
export class BackendChooserComponent implements OnInit
{
  constructor(private store:Store)
  {
  }

  public ngOnInit():any
  {
    // check for existing config in localStorage
    if (window.localStorage.hasOwnProperty('splServerUrl'))
    {
      var lastBackendUrl:string = window.localStorage.getItem('splServerUrl');
      this.store.dispatch(BackendActions.backendUrlSelected(lastBackendUrl));
    }
  }

  public onBackendSelected(backendUrl:string)
  {
    this.store.dispatch(BackendActions.backendUrlSelected(backendUrl));
    window.localStorage.setItem('splServerUrl', backendUrl);
  }

  public onBackendUrlCommit(event:any):boolean
  {
    this.store.dispatch(BackendActions.backendUrlCommited());
    this.store.dispatch(AuthenticationActions.validSessionRequired());
    return false;
  }
}
