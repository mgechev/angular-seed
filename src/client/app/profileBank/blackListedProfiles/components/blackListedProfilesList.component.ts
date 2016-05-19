import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES,OnActivate,Router } from '@angular/router';
import { MyProfilesInfo,Masters } from '../../myProfiles/model/myProfilesInfo';
import { BlackListedProfilesService } from '../services/blacklistedProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';

@Component({
    selector: 'rrf-black-listed-profiles-list',
    templateUrl: 'app/profileBank/blackListedProfiles/components/blackListedProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES]
  //  providers:[MastersService]
})

export class BlackListedProfilesListComponent implements OnActivate {
    blacklistedProfilesList: Array<MyProfilesInfo>;
    statusList: Array<Masters>;
    seletedCandidateID: number;
    selectedStatus: Masters;
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    constructor(private _blacklistedProfilesService: BlackListedProfilesService,
        private _router: Router,
        private _masterService: MastersService) {
    }

    routerOnActivate() {
        this.getBlacklistedProfiles();
        this.getCandidateStatuses();
    }
    getBlacklistedProfiles() {
        this._blacklistedProfilesService.getBlackListedProfiles()
            .subscribe(
            results => {
                this.blacklistedProfilesList = results;
            },
            error => this.errorMessage = <any>error);
    }
    redirectToView(CandidateID:number){
        this._router.navigate(['/ProfileBank/BlackListedProfiles/View/'+CandidateID]);
        
    }
    
     SaveCandidateID(id: number) {
        this.seletedCandidateID = id;
        var index = _.findIndex(this.blacklistedProfilesList, { CandidateID: this.seletedCandidateID });
        this.Comments = this.blacklistedProfilesList[index].Comments;
        this.currentStatus = this.blacklistedProfilesList[index].Status[0].Id;
    }
    getCandidateStatuses() {
        this._masterService.getCandidateStatuses()
            .subscribe(
            results => {
                this.statusList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onSelectStatus(statusId: number) {
        for (var i = 0; i < this.statusList.length; i++) {
            if (this.statusList[i].Id == statusId) {
                this.selectedStatus = this.statusList[i];
            }
        }
    }

    onUpdateStauts() {
        this._blacklistedProfilesService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.Comments)
            .subscribe(
            results => {
                $('#myModal').modal('toggle');
                this.getBlacklistedProfiles();
            },
            error => this.errorMessage = <any>error);
    }
}
