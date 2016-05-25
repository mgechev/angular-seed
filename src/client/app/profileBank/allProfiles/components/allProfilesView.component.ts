import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment, Router } from '@angular/router';
import { MyProfilesInfo } from '../../myProfiles/model/myProfilesInfo';
import { AllProfilesService } from '../services/allProfiles.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-allprofiles-view',
    templateUrl: 'allProfilesView.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AllProfilesViewComponent implements OnActivate {
    params: string;
    errorMessage: string;
    profile: MyProfilesInfo;
    constructor(private _allProfilesService: AllProfilesService,
        private _router: Router) {
        this.profile = new MyProfilesInfo();
    }
    routerOnActivate(segment: RouteSegment) {
        this.params = segment.getParam('id');
        if (this.params) {
            this._allProfilesService.getCandidateProfile(this.params)
                .subscribe(
                results => {
                    this.profile = <any>results;
                },
                error => this.errorMessage = <any>error);
        }
    }

}
