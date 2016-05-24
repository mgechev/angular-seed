import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate } from '@angular/router';
import {MyProfilesInfo, Masters} from '../../myProfiles/model/myProfilesInfo';
import { RecentProfilesService } from '../services/recentProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'rrf-recent-profiles-list',
    templateUrl: 'recentProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})

export class RecentProfilesListComponent implements OnActivate {
    recentProfilesList: Array<MyProfilesInfo>;
    profile: MyProfilesInfo;
    statusList: Array<Masters>;
    seletedCandidateID: number;
    selectedStatus: number;
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    currentCandidate: string;

    public isCollapsed: boolean = false;
    constructor(private _recentProfilesService: RecentProfilesService,
        private _router: Router,
        private _masterService: MastersService) {
        this.profile = new MyProfilesInfo();
        this.profile.Status = new Masters();
    }
    routerOnActivate() {
        this.getRecentProfiles();
        this.getCandidateStatuses();
    }

    getRecentProfiles() {
        this._recentProfilesService.getRecentProfiles()
            .subscribe(
            results => {
                this.recentProfilesList = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    redirectToView(CandidateID: number) {
        this._router.navigate(['App/ProfileBank/RecentProfiles/View/' + CandidateID]);
    }

    SaveCandidateID(id: number) {
        this.seletedCandidateID = id;
        var index = _.findIndex(this.recentProfilesList, { CandidateID: this.seletedCandidateID });
        this.profile.Comments = this.recentProfilesList[index].Comments;
        this.profile.Status = this.recentProfilesList[index].Status;
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
        this.selectedStatus = parseInt(statusId);
    }


    onUpdateStauts() {
        this._recentProfilesService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.profile.Comments)
            .subscribe(
            results => {
                this.profile.Status = new Masters();
                this.getRecentProfiles();
            },
            error => {
                this.errorMessage = <any>error;
            });
        this.isCollapsed = false;
    }

    closeUpdatePanel() {
        this.isCollapsed = false;
    }
}
