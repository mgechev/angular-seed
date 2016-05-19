import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES ,RouteSegment,Router,OnActivate} from '@angular/router';
import { MyProfilesInfo } from '../../myProfiles/model/myProfilesInfo';
import { MyProfilesService } from '../services/myProfiles.service';

@Component({
    selector: 'rrf-blacklistedprofiles-view',
    templateUrl: 'app/profileBank/myProfiles/components/myProfilesView.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['app/profileBank/myProfiles/components/myProfiles.component.css']
})
export class MyProfilesViewComponent implements OnActivate {
    params: string;
    profile: MyProfilesInfo;
    errorMessage: string;
    constructor(private _myProfilesService: MyProfilesService,
        private _router: Router) {
        this.profile = new MyProfilesInfo();
    }
    routerOnActivate(segment:RouteSegment) {
        this.params = segment.getParam('id');
        if (this.params) {
            this._myProfilesService.getCandidateProfile(this.params)
                .subscribe(
                results => {
                    this.profile = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

}