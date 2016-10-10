import {Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
//import { ProfileBankService } from '../../profilebank/shared/services/profileBank.service';
import { ProfileBankService } from '../../profileBank/shared/services/profileBank.service';
import { MasterData } from  '../../shared/model/index';

@Component({
    moduleId: module.id,
    selector: 'top-navigation-bar',
    templateUrl: 'topNavigationBar.component.html',
    //directives: [ROUTER_DIRECTIVES],
    providers: [ProfileBankService]
})

export class TopNavigationBarComponent implements OnInit, OnDestroy {

    isAuthenticated: boolean;
    currentUser = new MasterData();
    errorMessage: string;
    subscription: EventEmitter<boolean> = new EventEmitter<boolean>();;
    constructor(private loginService: LoginService,
        private _router: Router,
        private _profileBankService: ProfileBankService) {
        this.isAuthenticated = false;
    }

    ngOnInit() {
        this.isAuthenticated = this.loginService.isAuthenticated();
        this.subscription = this.loginService.getAuthEmitter()
            .subscribe((value: boolean) => { this.isAuthenticated = value; });
        this.getLoggedInUser();

    }
    getLoggedInUser() {
        this._profileBankService.getCurrentLoggedInUser()
            .subscribe(
            (results: MasterData) => {
                this.currentUser = results;
            },
            error => this.errorMessage = <any>error);

    }
    // This function search profiles acoording to search string
    advancedSearch(searchString: string) {
        alert('We Are working on searching');
        //TO DO: uncomment below api after API get ready
        //this._router.navigate(['/App/ProfileBank/AdvanceSearch/' + searchString + 'searchString' + searchString]);
    }

    logout() {
        this.loginService.logout();
        this._router.navigate(['/Login']);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    pushNotificationSettings() {
        this._router.navigate(['/App/NotificationSetting']);
    }
}
