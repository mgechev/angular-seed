import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate } from '@angular/router';
import {MyProfilesInfo} from '../../shared/model/myProfilesInfo';
import { RecentProfilesService } from '../services/recentProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService } from '../../shared/services/profilebank.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-recent-profiles-list',
    templateUrl: 'recentProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    providers: [ProfileBankService]
})

export class RecentProfilesListComponent implements OnActivate {
    recentProfilesList: Array<MyProfilesInfo>;
    profile: MyProfilesInfo = new MyProfilesInfo();
    statusList: Array<MasterData>;
    seletedCandidateID: string;
    selectedStatus: number;
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    currentCandidate: string;
    isCollapsed: boolean = false;

    //inject services
    constructor(private _recentProfilesService: RecentProfilesService,
        private _router: Router,
        private toastr: ToastsManager,
        private _profileBankService: ProfileBankService,
        private _masterService: MastersService) { }

    //Call Below methods when this page is loaded
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

    SaveCandidateID(id: string) {
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
        this._profileBankService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.profile.Comments)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.profile.Status = new MasterData();
                    this.getRecentProfiles();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
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
