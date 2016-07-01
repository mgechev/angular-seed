import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router } from '@angular/router';
import { MyProfilesInfo } from '../../shared/model/myProfilesInfo';
import { CompanyProfilesService } from '../services/companyProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService } from '../../shared/services/profilebank.service';
import { DataSharedService } from '../../shared/services/DataShared.service';
@Component({
    moduleId: module.id,
    selector: 'rrf-black-listed-profiles-list',
    templateUrl: 'companyProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})

export class CompanyProfilesListComponent implements OnActivate {
    companyProfilesList: Array<MyProfilesInfo>;
    profile: MyProfilesInfo;
    statusList: Array<MasterData>;
    seletedCandidateID: string;
    selectedStatus = new MasterData();
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    currentCandidate: string;
    currentUser: MasterData = new MasterData();
    selectedRowCount: number = 0;
    allChecked: boolean = false;

    public isCollapsed: boolean = false;
    constructor(private _companyProfilesService: CompanyProfilesService,
        private _router: Router,
        public toastr: ToastsManager,
        private _dataSharedService: DataSharedService,
        private _profileBankService: ProfileBankService,
        private _masterService: MastersService) {
        this.profile = new MyProfilesInfo();
    }

    routerOnActivate() {
        this.getLoggedInUser();
        this.getcompanyProfiles();
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

    getcompanyProfiles() {
        this._companyProfilesService.getCompanyProfiles()
            .subscribe(
            (results: any) => {
                if (results.length !== undefined) {
                    this.companyProfilesList = results;
                }
            },
            error => {
                this.errorMessage = <any>error;
            });
    }
    redirectToView(CandidateID: number) {
        this._router.navigate(['/App/ProfileBank/companyProfiles/View/' + CandidateID]);
    }
    redirectToEditProfile(CandidateID: string) {
        this._router.navigate(['/App/ProfileBank/companyProfiles/Edit/' + CandidateID]);

    }
     SaveCandidateID(id: string) {
        this.seletedCandidateID = id;

        var index = _.findIndex(this.companyProfilesList, { CandidateID: this.seletedCandidateID });
        // this.profile.Comments = this.allProfilesList[index].Comments;
        // this.profile.Status = this.allProfilesList[index].Status;
        this.currentCandidate = this.companyProfilesList[index].Candidate;
        this._profileBankService.getStatusById(id)
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
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.profile.Status = new MasterData();
                    this.getcompanyProfiles();
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
    onStateChange(e: any): void {
        if (e.target.checked) {
            this.selectedRowCount++;
        } else {
            this.selectedRowCount--;
        }

        if (this.selectedRowCount === this.companyProfilesList.length) {
            this.allChecked = true;
        } else {
            this.allChecked = false;
        }
    }

    onAllSelect(e: any): void {
        var state: boolean;
        if (e.target.checked) {
            state = true;
            this.selectedRowCount = this.companyProfilesList.length;
        } else {
            state = false;
            this.selectedRowCount = 0;
        }

        for (var index = 0; index < this.companyProfilesList.length; index++) {
            this.companyProfilesList[index].IsChecked = state;
        }
    }


    transferOwnerShipClick() {
        let checkedItemIds: Array<string> = new Array<string>();
        for (var index = 0; index < this.companyProfilesList.length; index++) {
            if (this.companyProfilesList[index].IsChecked) {
                checkedItemIds.push(this.companyProfilesList[index].CandidateID);
            }
        }
        this._dataSharedService.setCheckedItems(checkedItemIds);
        this._router.navigate(['/App/ProfileBank/CompanyProfiles/Transfer/']);
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

       AssignRRFClick() {
        let checkedItemIds: string = '';
        for (var index = 0; index < this.companyProfilesList.length; index++) {
            if (this.companyProfilesList[index].IsChecked) {
                checkedItemIds = checkedItemIds + this.companyProfilesList[index].CandidateID + ',';
            }
        }
        sessionStorage.setItem('CandidateIDs',checkedItemIds);
        sessionStorage.setItem('returnPath','/App/ProfileBank/CompanyProfiles');
        this._router.navigate(['/App/ProfileBank/CompanyProfiles/Assign']);
    }
}
