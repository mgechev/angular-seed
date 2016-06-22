import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router } from '@angular/router';
import { MyProfilesInfo } from '../../shared/model/myProfilesInfo';
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
    blacklistedProfilesList: Array<MyProfilesInfo>;
    profile: MyProfilesInfo;
    statusList: Array<MasterData>;
    seletedCandidateID: string;
    selectedStatus= new MasterData();
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    currentCandidate: string;
    currentUser: MasterData = new MasterData();
    isCollapsed: boolean = false;

    constructor(private _blacklistedProfilesService: BlackListedProfilesService,
        private _router: Router,
        public toastr: ToastsManager,
        private _profileBankService: ProfileBankService,
        private _masterService: MastersService) {
        this.profile = new MyProfilesInfo();

    }

    routerOnActivate() {
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

    getBlacklistedProfiles() {
        this._blacklistedProfilesService.getBlackListedProfiles()
            .subscribe(
            (results : Array<MyProfilesInfo>)=> {
                this.blacklistedProfilesList = results;
            },
            error => {
                this.errorMessage = <any>error;
            });
    }
    redirectToEditProfile(CandidateID: string) {
        this._router.navigate(['/App/ProfileBank/BlackListedProfiles/Edit/' + CandidateID]);

    }
    redirectToView(CandidateID: string) {
        this._router.navigate(['/App/ProfileBank/BlackListedProfiles/View/' + CandidateID]);
    }

    SaveCandidateID(id: string) {
        this.seletedCandidateID = id;
        var index = _.findIndex(this.blacklistedProfilesList, { CandidateID: this.seletedCandidateID });
        this.profile.Comments = this.blacklistedProfilesList[index].Comments;
        this.profile.Status = this.blacklistedProfilesList[index].Status;
        this.currentCandidate = this.blacklistedProfilesList[index].Candidate;
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
            if(Owner.Id === 0) { return false; }
            if (Owner.Id === this.currentUser.Id) {
                return false;
            } else { return true; }
        } catch (error) {
            this.toastr.error(error);
            return true;
        }
    }

}
