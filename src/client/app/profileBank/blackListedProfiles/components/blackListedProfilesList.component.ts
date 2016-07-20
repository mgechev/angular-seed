import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router } from '@angular/router';
import { AllCandidateProfiles, CandidateProfile } from '../../shared/model/myProfilesInfo';
import { BlackListedProfilesService } from '../services/blacklistedProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService } from '../../shared/services/profilebank.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-black-listed-profiles-list',
    templateUrl: 'blackListedProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})

export class BlackListedProfilesListComponent implements OnActivate {
    blacklistedProfilesList: AllCandidateProfiles = new AllCandidateProfiles();
    profile: CandidateProfile;
    statusList: Array<MasterData>;
    seletedCandidateID: MasterData = new MasterData();
    selectedStatus = new MasterData();
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    currentCandidate: string;
    currentUser: MasterData = new MasterData();
    isCollapsed: boolean = false;
    CandidateProfiles: AllCandidateProfiles = new AllCandidateProfiles();

    constructor(private _blacklistedProfilesService: BlackListedProfilesService,
        private _router: Router,
        public toastr: ToastsManager,
        private _profileBankService: ProfileBankService,
        private _masterService: MastersService) {
        this.profile = new CandidateProfile();

    }

    routerOnActivate() {
        this.setPaginationValues();
        this.getLoggedInUser();
        this.getBlacklistedProfiles();
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

    setPaginationValues() {
        //this.CandidateProfiles.GrdOperations.
        this.blacklistedProfilesList.GrdOperations.ButtonClicked = 0;
        this.blacklistedProfilesList.GrdOperations.PerPageCount = 3;
    }

    getBlacklistedProfiles() {
        this._blacklistedProfilesService.getBlackListedProfiles(this.blacklistedProfilesList.GrdOperations)
            .subscribe(
            (results: AllCandidateProfiles) => {
                if (results.Profiles.length !== undefined) {
                     this.blacklistedProfilesList = results;
                    //this.CandidateProfiles = results;
                }
            },
            error => {
                this.errorMessage = <any>error;
            });
    }

    redirectToEditProfile(CandidateID: MasterData) {
        this._router.navigate(['/App/ProfileBank/BlackListedProfiles/Edit/' + CandidateID.Value + 'ID' + CandidateID.Id]);
    }
    redirectToView(CandidateID: MasterData) {
        this._router.navigate(['/App/ProfileBank/BlackListedProfiles/View/' + CandidateID.Value + 'ID' + CandidateID.Id]);
    }

    SaveCandidateID(id: MasterData) {
        //this.seletedCandidateID = id;

        var index = _.findIndex(this.blacklistedProfilesList.Profiles, { CandidateID: id });
        this.seletedCandidateID = this.blacklistedProfilesList.Profiles[index].CandidateID;
       // var index = _.findIndex(this.CandidateProfiles.Profiles, { CandidateID: id });
        // this.seletedCandidateID = this.CandidateProfiles.Profiles[index].CandidateID;
        // this.profile.Comments = this.allProfilesList[index].Comments;
        // this.profile.Status = this.allProfilesList[index].Status;
        this.currentCandidate = this.CandidateProfiles.Profiles[index].Candidate;
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
            error => {
                this.toastr.error(<any>error);
                this.errorMessage = <any>error;
            });
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
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.profile.Status = new MasterData();
                    this.getBlacklistedProfiles();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            error => this.errorMessage = <any>error);
        this.isCollapsed = false;
    }

    closeUpdatePanel() {
        this.isCollapsed = false;
    }

    getEditAccess(Owner: MasterData) {
        try {
            if (Owner.Id === 0) { return false; }
            if (Owner.Id === this.currentUser.Id) {
                return false;
            } else { return true; }
        } catch (error) {
            this.toastr.error(error);
            return true;
        }
    }

    OnPaginationClick(ButtonClicked: string) {
        /* ButtonClicked 
                i. Initial - 0
                ii.Next - 1
                iii.Prev - (-1)
            PerPageCount = No of items shown per page
                */
        this.CandidateProfiles.GrdOperations.ButtonClicked = parseInt(ButtonClicked);
        this.CandidateProfiles.GrdOperations.PerPageCount = 3;
        this.getBlacklistedProfiles();
    }
}
