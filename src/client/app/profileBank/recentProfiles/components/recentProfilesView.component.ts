import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment, Router } from '@angular/router';
import { MyProfilesInfo } from '../../myProfiles/model/myProfilesInfo';
import { RecentProfilesService } from '../services/recentProfiles.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-allprofiles-view',
    templateUrl: 'recentProfilesView.component.html',
    directives: [ROUTER_DIRECTIVES],
        styleUrls:['../../allProfiles/components/allProfilesView.component.css']
})
export class RecentProfilesViewComponent implements OnActivate {
    params: string;
    errorMessage: string;
    profile: MyProfilesInfo;
    constructor(private _recentProfilesService: RecentProfilesService,
        private _router: Router) {
        this.profile = new MyProfilesInfo();
    }
    routerOnActivate(segment: RouteSegment) {
        this.params = segment.getParam('id');
        if (this.params) {
            this._recentProfilesService.getCandidateProfile(this.params)
                .subscribe(
                results => {
                    this.profile = <any>results;
                },
                error => this.errorMessage = <any>error);
        }
    }

}
