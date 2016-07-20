import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate } from '@angular/router';
import {CandidateProfile} from '../../shared/model/myProfilesInfo';
import { RecentProfilesService } from '../services/recentProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService } from '../../shared/services/profileBank.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-recent-profiles-list',
    templateUrl: 'recentProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    providers: [ProfileBankService]
})

export class RecentProfilesListComponent implements OnActivate {
    recentProfilesList: Array<CandidateProfile>;
    profile: CandidateProfile = new CandidateProfile();
    statusList: Array<MasterData>;
    seletedCandidateID: MasterData = new MasterData();;
    selectedStatus = new MasterData();
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    currentCandidate: string;
    isCollapsed: boolean = false;
    currentUser: MasterData = new MasterData();

    //inject services
    constructor(private _recentProfilesService: RecentProfilesService,
        private _router: Router,
        private toastr: ToastsManager,
        private _profileBankService: ProfileBankService,
        private _masterService: MastersService) { }

    //Call Below methods when this page is loaded
    routerOnActivate() {
        this.getLoggedInUser();
        this.getRecentProfiles();
        this.getCandidateStatuses();
    }
    getLoggedInUser() {
        this._profileBankService.getCurrentLoggedInUser()
            .subscribe(
            (results: MasterData) => {
                this.currentUser = results;
            },
            error => this.errorMessage = <any>error);

    }


    getRecentProfiles() {
        this._recentProfilesService.getRecentProfiles()
            .subscribe(
            (results: any) => {
                if (results.length !== undefined) {

                    this.recentProfilesList = <any>results;
                }
            },
            error => this.errorMessage = <any>error);
    }

    redirectToView(CandidateID: MasterData) {
        this._router.navigate(['App/ProfileBank/RecentProfiles/View/' +  CandidateID.Value+'ID'+CandidateID.Id]);
    }

    SaveCandidateID(id: MasterData) {
        this.seletedCandidateID = id;

        var index = _.findIndex(this.recentProfilesList, { CandidateID: this.seletedCandidateID });
        this.currentCandidate = this.recentProfilesList[index].Candidate;
        this._profileBankService.getStatusById(id.Value)
            .subscribe(
            (results: any) => {
                this.profile.Comments = results.Comments;
                this.profile.Status = results.Status;
            },
            error => this.toastr.error(<any>error));
        window.scrollTo(0, 40);

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
        this.selectedStatus.Id = parseInt(statusId);
        this.selectedStatus.Value = null;
    }

    onUpdateStauts() {
        if (this.selectedStatus.Id === undefined)
            this.selectedStatus = this.profile.Status;

        this._profileBankService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.profile.Comments)
            .subscribe(
            (results: ResponseFromAPI) => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.profile.Status = new MasterData();
                    this.getRecentProfiles();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            (error: any) => {
                this.errorMessage = <any>error;
            });
        this.isCollapsed = false;
    }

    closeUpdatePanel() {
        this.isCollapsed = false;
    }
    redirectToEditProfile(CandidateID: MasterData) {
        this._router.navigate(['/App/ProfileBank/RecentProfiles/Edit/' + CandidateID.Value+'ID'+CandidateID.Id]);
    }

    getEditAccess(Owner: MasterData) {
        try {
            if (Owner.Id === this.currentUser.Id) {
                return false;
            } else { return true; }
        } catch (error) {
            this.toastr.error(error);
            return false;
        }

    }
}
