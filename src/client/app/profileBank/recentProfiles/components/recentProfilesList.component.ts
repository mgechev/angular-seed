import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate } from '@angular/router';
import {CandidateProfile, AllCandidateProfiles} from '../../shared/model/myProfilesInfo';
import { RecentProfilesService } from '../services/recentProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService } from '../../shared/services/profileBank.service';
import { ProfileBankPipe }from '../../shared/filter/profileBank.pipe';

@Component({
    moduleId: module.id,
    selector: 'rrf-recent-profiles-list',
    templateUrl: 'recentProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    providers: [ProfileBankService],
    pipes: [ProfileBankPipe]
})

export class RecentProfilesListComponent implements OnActivate {
    recentProfilesList: AllCandidateProfiles = new AllCandidateProfiles();
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
    NORECORDSFOUND: boolean = false;

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
        this._recentProfilesService.getRecentProfiles(this.recentProfilesList.GrdOperations)
            .subscribe(
            (results: any) => {
                if (results.Profiles !== undefined && results.Profiles.length > 0) {
                    this.recentProfilesList = <any>results;
                } else { this.NORECORDSFOUND = true; }
            },
            error => this.errorMessage = <any>error);
    }

    redirectToView(CandidateID: MasterData) {
        this._router.navigate(['App/ProfileBank/RecentProfiles/View/' + CandidateID.Value + 'ID' + CandidateID.Id]);
    }
    /** Delete Prfile will be available only to the Recruitment Head*/
    deleteCandidate(CandidateID: MasterData) {
        this._profileBankService.deleteProfile(CandidateID)
            .subscribe(
            (results: any) => {
                this.profile.Comments = results.Comments;
                this.profile.Status = results.Status;
            },
            error => this.toastr.error(<any>error));
    }
    /**Redirecting to candidate's all interview history page */
    getCandidateHistory(CandidateID: MasterData) {
        this._router.navigate(['App/ProfileBank/RecentProfiles/History']);
    }
    SaveCandidateID(id: MasterData) {
        this.seletedCandidateID = id;

        var index = _.findIndex(this.recentProfilesList.Profiles, { CandidateID: this.seletedCandidateID });
        this.currentCandidate = this.recentProfilesList.Profiles[index].Candidate;
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
        this._router.navigate(['/App/ProfileBank/RecentProfiles/Edit/' + CandidateID.Value + 'ID' + CandidateID.Id]);
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
    onChange() {
        this.recentProfilesList.GrdOperations.ButtonClicked = 0;
        this.recentProfilesList.GrdOperations.NextPageUrl = new Array<string>();
        this.getRecentProfiles();
    }
    OnPaginationClick(ButtonClicked: string) {
        /* ButtonClicked 
                i. Initial - 0
                ii.Next - 1
                iii.Prev - (-1)
           PerPageCount = No of items shown per page
                */
        this.recentProfilesList.GrdOperations.ButtonClicked = parseInt(ButtonClicked);
        this.getRecentProfiles();
    }
}
