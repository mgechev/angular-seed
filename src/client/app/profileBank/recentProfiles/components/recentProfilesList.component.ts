import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate } from '@angular/router';
import {MyProfilesInfo, Masters} from '../../myProfiles/model/myProfilesInfo';
import { RecentProfilesService } from '../services/recentProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';

@Component({
    selector: 'rrf-recent-profiles-list',
    templateUrl: 'app/profileBank/recentProfiles/components/recentProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class RecentProfilesListComponent implements OnActivate {
    recentProfilesList: Array<MyProfilesInfo>;
    statusList: Array<Masters>;
    seletedCandidateID: number;
    selectedStatus: Masters;
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    constructor(private _recentProfilesService: RecentProfilesService,
        private _router: Router,
        private _masterService: MastersService) {
    }
    routerOnActivate() {
        this.getRecentProfiles();
        this.getCandidateStatuses();
    }

    getRecentProfiles() {
        this._recentProfilesService.getRecentProfiles()
            .subscribe(
            results => {
                this.recentProfilesList = results;
            },
            error => this.errorMessage = <any>error);
    }
    redirectToView(CandidateID: number) {
        this._router.navigate(['/ProfileBank/RecentProfiles/View/' + CandidateID]);
    }
    SaveCandidateID(id: number) {
        this.seletedCandidateID = id;
        var index = _.findIndex(this.recentProfilesList, { CandidateID: this.seletedCandidateID });
        this.Comments = this.recentProfilesList[index].Comments;
        this.currentStatus = this.recentProfilesList[index].Status[0].Id;
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
            if (this.statusList[i].Id === statusId) {
                this.selectedStatus = this.statusList[i];
            }
        }
    }

    onUpdateStauts() {
        this._recentProfilesService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.Comments)
            .subscribe(
            results => {
                $('#myModal').modal('toggle');
                this.getRecentProfiles();
            },
            error => this.errorMessage = <any>error);
    }
}
