import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, RouteSegment, Router, OnActivate} from '@angular/router';
import { MyProfilesInfo } from '../../shared/model/myProfilesInfo';
import { ProfileBankService} from  '../../shared/services/profileBank.service';
@Component({
    moduleId: module.id,
    selector: 'rrf-blacklistedprofiles-view',
    templateUrl: 'myProfilesView.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['../../allProfiles/components/allProfilesView.component.css']
})

export class MyProfilesViewComponent implements OnActivate {
    params: string;
    profile: MyProfilesInfo;
    errorMessage: string;
    constructor(private _profileBankService: ProfileBankService,
        private _router: Router) {
        this.profile = new MyProfilesInfo();
    }
    routerOnActivate(segment: RouteSegment) {
        this.params = segment.getParam('id');
        if (this.params) {
            this._profileBankService.getCandidateProfile(this.params)
                .subscribe(
                results => {
                    this.profile = <any>results;
                },
                error => this.errorMessage = <any>error);
        }
    }
}
