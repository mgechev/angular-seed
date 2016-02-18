import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Store} from '../../../store/store';

@Component({
  selector: 'login',
  template: `<h1>Login</h1>`
})
export class LoginComponent implements OnInit {
  constructor(private store:Store) {
  }

  public ngOnInit():any {

    return null;
  }
}
