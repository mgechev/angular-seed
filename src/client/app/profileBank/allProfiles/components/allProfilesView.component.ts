import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment, Router } from '@angular/router';
import { MyProfilesInfo } from '../../shared/model/myProfilesInfo';
import { ProfileBankService } from '../../shared/services/profilebank.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-allprofiles-view',
    templateUrl: 'allProfilesView.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['allProfilesView.component.css']
})
export class AllProfilesViewComponent implements OnActivate {
    params: string;
    errorMessage: string;
    profile: MyProfilesInfo;
    count:number=0;
    constructor(private _profileBankService: ProfileBankService,
        private _router: Router) {
        this.profile = new MyProfilesInfo();
    }
    routerOnActivate(segment: RouteSegment) {
        this.params = segment.getParam('id');
        if (this.params) {
            this._profileBankService.getCandidateProfile(this.params)
                .subscribe(
                (results : MyProfilesInfo)=> {
                    this.profile = results;
                    this.count = results.CandidateQualification.length;
                },
                error => this.errorMessage = <any>error);
        }
    }
}
