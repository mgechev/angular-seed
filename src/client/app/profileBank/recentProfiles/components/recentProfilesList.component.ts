import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate } from '@angular/router';
import {MyProfilesInfo, Masters} from '../../myProfiles/model/myProfilesInfo';
import { RecentProfilesService } from '../services/recentProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse';

@Component({
    moduleId: module.id,
    selector: 'rrf-recent-profiles-list',
    templateUrl: 'recentProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})

export class RecentProfilesListComponent implements OnActivate {
    recentProfilesList: Array<MyProfilesInfo>;
    statusList: Array<Masters>;
    seletedCandidateID: number;
    selectedStatus: Masters;
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    currentCandidate: string;

    public isCollapsed: boolean = false;
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
        this._router.navigate(['App/ProfileBank/RecentProfiles/View/' + CandidateID]);
    }

    SaveCandidateID(id: number) {
        this.seletedCandidateID = id;
        var index = _.findIndex(this.recentProfilesList, { CandidateID: this.seletedCandidateID });
        this.Comments = this.recentProfilesList[index].Comments;
        this.currentStatus = this.recentProfilesList[index].Status[0].Id;
        this.currentCandidate = this.recentProfilesList[index].Candidate;
        if (this.isCollapsed === false)
            this.isCollapsed = !this.isCollapsed;
    }

    getCandidateStatuses() {
        this._masterService.getCandidateStatuses()
            .subscribe(
            results => {
                this.statusList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onSelectStatus(statusId: string) {
        for (var i = 0; i < this.statusList.length; i++) {
            if (this.statusList[i].Id === parseInt(statusId)) {
                this.selectedStatus = this.statusList[i];
            }
        }
    }
    onUpdateStauts() {
        if (this.selectedStatus === undefined) {
            var index = _.findIndex(this.recentProfilesList, { CandidateID: this.seletedCandidateID });
            this.selectedStatus = this.recentProfilesList[index].Status[0];
        }
        this._recentProfilesService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.Comments)
            .subscribe(
            results => {
                this.getRecentProfiles();
            },
            error => this.errorMessage = <any>error);
        this.isCollapsed = false;
    }

    closeUpdatePanel() {
        this.isCollapsed = false;
    }
}
