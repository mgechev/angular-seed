import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CandidateProfile, AllCandidateProfiles} from '../../shared/model/myProfilesInfo';
import { Candidate } from '../../shared/model/RRF';
import { CompanyProfilesService } from '../services/companyProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
//import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { MasterData, SortingMasterData, GrdOptions, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService } from '../../shared/services/profileBank.service';
import { DataSharedService } from '../../shared/services/dataShared.service';
import { ProfileBankPipe }from '../../shared/filter/profileBank.pipe';
import {IfAuthorizeDirective} from '../../../shared/directives/ifAuthorize.directive';
import { DetailProfileComponent } from '../../shared/component/detailProfile.component';

@Component({
    moduleId: module.id,
    selector: 'rrf-black-listed-profiles-list',
    templateUrl: 'companyProfilesList.component.html',
    //directives: [DetailProfileComponent, ROUTER_DIRECTIVES, IfAuthorizeDirective, CollapseDirective, TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    providers: [CompanyProfilesService]
    //,pipes: [ProfileBankPipe]
})

export class CompanyProfilesListComponent implements OnInit {
    companyProfilesList: AllCandidateProfiles = new AllCandidateProfiles();
    ColumnList: Array<SortingMasterData> = new Array<SortingMasterData>();

    profile: CandidateProfile;
    statusList: Array<MasterData>;
    seletedCandidateID: MasterData = new MasterData();
    selectedStatus = new MasterData();
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    currentCandidate: string;
    currentUser: MasterData = new MasterData();
    selectedRowCount: number = 0;
    allChecked: boolean = false;
    selectedCandidates: Array<Candidate>;
    public isCollapsed: boolean = false;
    Candidate: Candidate;
    NORECORDSFOUND: boolean = false;
    constructor(private _companyProfilesService: CompanyProfilesService,
        private _router: Router,
        public toastr: ToastsManager,
        private _dataSharedService: DataSharedService,
        private _profileBankService: ProfileBankService,
        private _masterService: MastersService) {
        this.profile = new CandidateProfile();
        this.selectedCandidates = new Array<Candidate>();
        this.Candidate = new Candidate();
        this.companyProfilesList.GrdOperations = new GrdOptions();
    }

    ngOnInit() {
        this.getColumnsForSorting();
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
        this._companyProfilesService.getCompanyProfiles(this.companyProfilesList.GrdOperations)
            .subscribe(
            (results: any) => {
                if (results.Profiles !== undefined && results.Profiles.length > 0) {
                    this.companyProfilesList = results;
                } else { this.NORECORDSFOUND = true; }
            },
            error => {
                this.errorMessage = <any>error;
            });
    }
    redirectToView(CandidateID: MasterData) {
        this._router.navigate(['/App/ProfileBank/CompanyProfiles/View/' + CandidateID.Value + 'ID' + CandidateID.Id]);
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
    getCandidateHistory(_candidateID: MasterData) {
        sessionStorage.setItem('HistoryOfCandidate', JSON.stringify(_candidateID));
        sessionStorage.setItem('onReturnPath', '/App/ProfileBank/CompanyProfiles');
        this._router.navigate(['/App/ProfileBank/CompanyProfiles/History']);
    }
    redirectToEditProfile(CandidateID: MasterData) {
        this._router.navigate(['/App/ProfileBank/CompanyProfiles/Edit/' + CandidateID.Value + 'ID' + CandidateID.Id]);

    }
    SaveCandidateID(id: MasterData) {
        //this.seletedCandidateID = id;

        var index = _.findIndex(this.companyProfilesList.Profiles, { CandidateID: id });
        this.seletedCandidateID = this.companyProfilesList.Profiles[index].CandidateID;
        // this.profile.Comments = this.allProfilesList[index].Comments;
        // this.profile.Status = this.allProfilesList[index].Status;
        this.currentCandidate = this.companyProfilesList.Profiles[index].Candidate;
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

        if (this.selectedRowCount === this.companyProfilesList.Profiles.length) {
            this.allChecked = true;
        } else {
            this.allChecked = false;
        }
    }

    onAllSelect(e: any): void {
        var state: boolean;
        if (e.target.checked) {
            state = true;
            this.selectedRowCount = this.companyProfilesList.Profiles.length;
        } else {
            state = false;
            this.selectedRowCount = 0;
        }

        for (var index = 0; index < this.companyProfilesList.Profiles.length; index++) {
            this.companyProfilesList.Profiles[index].IsChecked = state;
        }
    }

    transferOwnerShipClick() {
        let checkedItemIds: Array<MasterData> = new Array<MasterData>();
        for (var index = 0; index < this.companyProfilesList.Profiles.length; index++) {
            if (this.companyProfilesList.Profiles[index].IsChecked) {
                checkedItemIds.push(this.companyProfilesList.Profiles[index].CandidateID);
            }
        }
        sessionStorage.setItem('CheckedItemIds', JSON.stringify(checkedItemIds));
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
        let chkRRFAssigned = false;

        for (var index = 0; index < this.companyProfilesList.Profiles.length; index++) {
            if (this.companyProfilesList.Profiles[index].IsChecked) {
                if (!this.companyProfilesList.Profiles[index].RRFAssigned.isRRFAssigned &&
                    this.companyProfilesList.Profiles[index].Status.Value.toLowerCase() !== 'incomplete') {
                    this.Candidate.CandidateID = this.companyProfilesList.Profiles[index].CandidateID;
                    this.Candidate.Candidate = this.companyProfilesList.Profiles[index].Candidate;
                    this.selectedCandidates.push(this.Candidate);
                    this.Candidate = new Candidate();
                } else { chkRRFAssigned = true; break; }
            }
        }
        if (chkRRFAssigned) {
            this.toastr.warning('Candidate already assigned to RRF Or Selected Candidate is of Incompleted Status');
            this.selectedCandidates = new Array<CandidateProfile>();
        } else {
            sessionStorage.setItem('Candidates', JSON.stringify(this.selectedCandidates));
            sessionStorage.setItem('returnPath', '/App/ProfileBank/CompanyProfiles');
            this._router.navigate(['/App/ProfileBank/CompanyProfiles/Assign']);
        }

    }
    onChange() {
        this.companyProfilesList.GrdOperations.ButtonClicked = 0;
        this.companyProfilesList.GrdOperations.NextPageUrl = new Array<string>();
        this.getcompanyProfiles();
    }
    OnPaginationClick(ButtonClicked: string) {
        /* ButtonClicked 
                i. Initial - 0
                ii.Next - 1
                iii.Prev - (-1)
           PerPageCount = No of items shown per page
                */
        this.companyProfilesList.GrdOperations.ButtonClicked = parseInt(ButtonClicked);
        this.getcompanyProfiles();
    }
    getColumnsForSorting() {
        this._profileBankService.getColumsForSorting('COMPANYPROFILS')
            .subscribe(
            (results: any) => {
                this.ColumnList = results;
            },
            error => this.toastr.error(<any>error));
    }
}
