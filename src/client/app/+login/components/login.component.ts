import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Http} from '@angular/http';
import {contentHeaders} from '../../common/headers';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.css'],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class LoginComponent {
  private loggedIn = false;

  constructor(private http: Http) {}

  login(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    this.http.post('http://localhost:8080/auth', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.json().token);
          this.loggedIn = true;
          // this.router.parent.navigateByUrl('/vat');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  signup(event) {
    event.preventDefault();
    // this.router.parent.navigateByUrl('/signup');
  }
}
