import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment, Router } from '@angular/router';
import { MyProfilesInfo } from '../../shared/model/myProfilesInfo';
import { ProfileBankService } from '../../shared/services/profilebank.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-allprofiles-view',
    templateUrl: 'recentProfilesView.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['../../allProfiles/components/allProfilesView.component.css']
})
export class RecentProfilesViewComponent implements OnActivate {
    params: string;
    errorMessage: string;
    profile: MyProfilesInfo;
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
