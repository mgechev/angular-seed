import { Component } from '@angular/core';
import {AuthInfo} from '../models/AuthInfo';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: 'app/login/components/login.component.html',
    styleUrls: ['app/login/components/login.component.css']
})
export class LoginComponent {
    public errorMessage: string;
    private model: AuthInfo;
    constructor(private _loginService: LoginService,private _router: Router) {
        this.model = new AuthInfo(0, '', '');
    }
    doLogin(): void {
        this._loginService.authenticate(this.model)
            .subscribe(
            results=> {
               this.getLoggedInUserPermission();
            },
            error => this.errorMessage = <any>error);
    }
    getLoggedInUserPermission():void {
        this._loginService.getLoggedInUserPermission()
            .subscribe(
            results=> {
               this._router.navigate(['/App']);
            },
            error => this.errorMessage = <any>error);
    }
}
