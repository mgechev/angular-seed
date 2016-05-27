import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment, Router } from '@angular/router';
import { MyProfilesInfo } from '../../myProfiles/model/myProfilesInfo';
import { BlackListedProfilesService } from '../services/blacklistedProfiles.service';

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
    constructor(private _blackListedProfilesService: BlackListedProfilesService,
        private _router: Router) {
        this.profile = new MyProfilesInfo();
    }
    routerOnActivate(segment:RouteSegment) {
        this.params = segment.getParam('id');
        if (this.params) {
            this._blackListedProfilesService.getCandidateProfile(this.params)
                .subscribe(
                results => {
                    this.profile = <any>results;
                },
                error => this.errorMessage = <any>error);
        }
    }
}
