import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment, Router } from '@angular/router';
import { MyProfilesInfo } from '../../shared/model/myProfilesInfo';

import { ProfileBankService } from '../../shared/services/profilebank.service';
@Component({
    moduleId: module.id,
    selector: 'rrf-blacklistedprofiles-view',
    templateUrl: 'blackListedProfilesView.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls:['../../allProfiles/components/allProfilesView.component.css']
})
export class BlackListedProfilesViewComponent implements OnActivate {
    params: string;
    profile: MyProfilesInfo;
    errorMessage: string;
    count:number=0;
    constructor(private _profileBankService:ProfileBankService,
        private _router: Router) {
        this.profile = new MyProfilesInfo();
    }
    routerOnActivate(segment:RouteSegment) {
        this.params = segment.getParam('id');
        if (this.params) {
            this._profileBankService.getCandidateProfile(this.params)
                .subscribe(
                (results:MyProfilesInfo )=> {
                    this.profile = results;
                    this.count = results.CandidateQualification.length;
                },
                error => this.errorMessage = <any>error);
        }
    }
}
