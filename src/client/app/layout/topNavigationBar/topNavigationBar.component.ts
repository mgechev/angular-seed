import {Component, OnInit, OnDestroy,EventEmitter} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

@Component({
    moduleId: module.id,
    selector: 'top-navigation-bar',
    templateUrl: 'topNavigationBar.component.html',
    directives: [ROUTER_DIRECTIVES],
})

export class TopNavigationBarComponent implements OnInit, OnDestroy {

    isAuthenticated: boolean;
    subscription: EventEmitter<boolean> = new EventEmitter<boolean>();;
    constructor(private loginService: LoginService, private _router: Router) {
        this.isAuthenticated = false;
    }

    ngOnInit() {
        this.isAuthenticated = this.loginService.isAuthenticated();
        this.subscription = this.loginService.getAuthEmitter()
            .subscribe((value: boolean) => { this.isAuthenticated = value; });
    }

    logout() {
        this.loginService.logout();
        this._router.navigate(['/Login']);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
